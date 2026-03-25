import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const audio = formData.get('audio') as Blob

    if (!audio) {
      return NextResponse.json({ error: 'No audio provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await audio.arrayBuffer())

    const response = await fetch(
      'https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&punctuate=true&diarize=true&utterances=true',
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`,
          'Content-Type': 'audio/webm',
        },
        body: buffer,
      }
    )

    const result = await response.json()

    const transcript = result.results?.channels[0]?.alternatives[0]
    const utterances = result.results?.utterances || []

    return NextResponse.json({
      transcript: transcript?.transcript || '',
      words: transcript?.words || [],
      utterances: utterances.map((u: any) => ({
        speaker: u.speaker,
        text: u.transcript,
        start: u.start,
        end: u.end,
      })),
    })
  } catch (err) {
    console.error('Transcription error:', err)
    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 })
  }
}