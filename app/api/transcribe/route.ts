import { NextResponse } from 'next/server'
import speech from '@google-cloud/speech'
import path from 'path'

const getClient = () => {
  if (process.env.GOOGLE_CREDENTIALS_JSON) {
    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_CREDENTIALS_JSON, 'base64').toString()
    )
    return new speech.SpeechClient({ credentials })
  }
  const keyPath = path.join(process.cwd(), 'vertex-key.json')
  return new speech.SpeechClient({ keyFilename: keyPath })
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const audio = formData.get('audio') as Blob
    const language = (formData.get('language') as string) || 'en'
    const mode = (formData.get('mode') as string) || 'mic'

    if (!audio) {
      return NextResponse.json({ error: 'No audio provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await audio.arrayBuffer())
    const audioBytes = buffer.toString('base64')
    const isArabic = language === 'ar'
    const isTab = mode === 'tab'
    const client = getClient()

    const recognizeRequest = {
      audio: { content: audioBytes },
      config: {
        encoding: 'WEBM_OPUS' as const,
        sampleRateHertz: 48000,
        languageCode: isArabic ? 'ar-AE' : 'en-US',
        alternativeLanguageCodes: isArabic ? ['ar-SA', 'ar-EG'] : ['en-GB'],
        enableAutomaticPunctuation: true,
        // Only use multichannel + diarization in tab mode
        audioChannelCount: isTab ? 2 : 1,
        enableSeparateRecognitionPerChannel: isTab,
        enableSpeakerDiarization: false, // disabled — unreliable on short chunks
        model: 'latest_long',
        useEnhanced: true,
      },
    }

    const [response] = await client.recognize(recognizeRequest as any)
    const results = response.results || []

    const utterances: { speaker: number, text: string, start: number, end: number }[] = []

    if (isTab) {
      // Tab mode: each result has a channelTag (0 = agent mic, 1 = client tab)
      for (const result of results) {
        const text = result.alternatives?.[0]?.transcript?.trim()
        if (!text) continue
        const channel = (result as any).channelTag ?? 0
        utterances.push({ speaker: channel, text, start: 0, end: 0 })
      }
    } else {
      // Mic mode: single speaker, just return transcript
      const fullTranscript = results
        .map(r => r.alternatives?.[0]?.transcript || '')
        .join(' ')
        .trim()
      if (fullTranscript) {
        utterances.push({ speaker: 0, text: fullTranscript, start: 0, end: 0 })
      }
    }

    const fullTranscript = utterances.map(u => u.text).join(' ').trim()

    return NextResponse.json({ transcript: fullTranscript, words: [], utterances })

  } catch (err: any) {
    console.error('Google Speech error:', err?.message || err)
    return NextResponse.json({ error: 'Transcription failed', details: err?.message }, { status: 500 })
  }
}
