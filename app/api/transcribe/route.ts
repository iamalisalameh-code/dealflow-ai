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
    const isOnsite = mode === 'onsite'
    const client = getClient()

    const recognizeRequest = {
  audio: { content: audioBytes },
  config: {
    encoding: 'WEBM_OPUS' as const,
    sampleRateHertz: 48000,
    languageCode: isArabic ? 'ar-AE' : 'en-US',
    alternativeLanguageCodes: isArabic ? ['ar-SA', 'ar-EG'] : ['en-GB'],
    enableAutomaticPunctuation: true,
    audioChannelCount: isTab ? 2 : 1,
    enableSeparateRecognitionPerChannel: isTab,
    enableSpeakerDiarization: isOnsite,
    diarizationConfig: isOnsite ? {
      enableSpeakerDiarization: true,
      minSpeakerCount: 2,
      maxSpeakerCount: 3,
    } : undefined,
    model: 'latest_long',
    useEnhanced: true,
  },
}

const [response] = await client.recognize(recognizeRequest as any)
const results = response.results || []

const utterances: { speaker: number, text: string, start: number, end: number }[] = []

if (isTab) {
  // Tab mode: multichannel — channel 0 = agent mic, channel 1 = client tab audio
  for (const result of results) {
    const text = result.alternatives?.[0]?.transcript?.trim()
    if (!text) continue
    const channel = (result as any).channelTag ?? 0
    utterances.push({ speaker: channel, text, start: 0, end: 0 })
  }
} else if (isOnsite) {
  // Onsite mode: diarization via word-level speaker tags
  // Google populates speakerTag on the last alternative's words
  const words = results
    .flatMap(r => r.alternatives?.[0]?.words || [])
    .filter(w => w.word)

  if (words.length > 0) {
    // Group consecutive words by speakerTag into utterance segments
    let currentSpeaker = (words[0] as any).speakerTag ?? 0
    let currentWords: string[] = []

    for (const word of words) {
      const speaker = (word as any).speakerTag ?? 0
      if (speaker === currentSpeaker) {
        currentWords.push(word.word!)
      } else {
        if (currentWords.length > 0) {
          utterances.push({ speaker: currentSpeaker, text: currentWords.join(' '), start: 0, end: 0 })
        }
        currentSpeaker = speaker
        currentWords = [word.word!]
      }
    }
    // Push final segment
    if (currentWords.length > 0) {
      utterances.push({ speaker: currentSpeaker, text: currentWords.join(' '), start: 0, end: 0 })
    }
  } else {
    // Diarization returned no word-level data — fall back to single speaker
    const fullTranscript = results
      .map(r => r.alternatives?.[0]?.transcript || '')
      .join(' ')
      .trim()
    if (fullTranscript) {
      utterances.push({ speaker: 0, text: fullTranscript, start: 0, end: 0 })
    }
  }
} else {
  // Phone mode or plain mic — single speaker (agent only)
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
