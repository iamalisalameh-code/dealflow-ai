import { NextResponse } from 'next/server'
import speech from '@google-cloud/speech'
import path from 'path'

const getClient = () => {
  const keyPath = path.join(process.cwd(), 'vertex-key.json')
  return new speech.SpeechClient({ keyFilename: keyPath })
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const audio = formData.get('audio') as Blob
    const language = (formData.get('language') as string) || 'en'

    if (!audio) {
      return NextResponse.json({ error: 'No audio provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await audio.arrayBuffer())
    const audioBytes = buffer.toString('base64')
    const isArabic = language === 'ar'
    const client = getClient()

    const recognizeRequest = {
      audio: { content: audioBytes },
      config: {
        encoding: 'WEBM_OPUS' as const,
        sampleRateHertz: 48000,
        languageCode: isArabic ? 'ar-AE' : 'en-US',
        alternativeLanguageCodes: isArabic ? ['ar-SA', 'ar-EG'] : ['en-GB'],
        enableAutomaticPunctuation: true,
        enableSpeakerDiarization: !isArabic,
        diarizationSpeakerCount: isArabic ? undefined : 2,
        model: 'latest_long',
        useEnhanced: true,
      },
    }

    const [response] = await client.recognize(recognizeRequest as any)
    const results = response.results || []

    const fullTranscript = results
      .map(r => r.alternatives?.[0]?.transcript || '')
      .join(' ')
      .trim()

    const utterances: { speaker: number, text: string, start: number, end: number }[] = []

    if (!isArabic && results.length > 0) {
      // Use last result which has full diarization
      const lastResult = results[results.length - 1]
      const words = lastResult?.alternatives?.[0]?.words || []

      let currentSpeaker = -1
      let currentText = ''
      let startTime = 0
      let endTime = 0

      for (const word of words) {
        const speaker = (word.speakerTag ?? 1) - 1 // normalize to 0-based
        const wordText = word.word || ''
        const wordStart = Number(word.startTime?.seconds || 0)
        const wordEnd = Number(word.endTime?.seconds || 0)

        if (speaker !== currentSpeaker) {
          if (currentText.trim()) {
            utterances.push({
              speaker: currentSpeaker < 0 ? 0 : currentSpeaker,
              text: currentText.trim(),
              start: startTime,
              end: endTime
            })
          }
          currentSpeaker = speaker
          currentText = wordText + ' '
          startTime = wordStart
          endTime = wordEnd
        } else {
          currentText += wordText + ' '
          endTime = wordEnd
        }
      }
      if (currentText.trim()) {
        utterances.push({
          speaker: currentSpeaker < 0 ? 0 : currentSpeaker,
          text: currentText.trim(),
          start: startTime,
          end: endTime
        })
      }
    }

    if (utterances.length === 0 && fullTranscript) {
      utterances.push({ speaker: 0, text: fullTranscript, start: 0, end: 0 })
    }

    return NextResponse.json({ transcript: fullTranscript, words: [], utterances })

  } catch (err: any) {
    console.error('Google Speech error:', err?.message || err)
    return NextResponse.json({ error: 'Transcription failed', details: err?.message }, { status: 500 })
  }
}
