import { NextResponse } from 'next/server'
import twilio from 'twilio'

export async function POST(request: Request) {
  const formData = await request.formData()
  const to = formData.get('To') as string
  const callerId = process.env.TWILIO_PHONE_NUMBER!

  const twiml = new twilio.twiml.VoiceResponse()

  if (to) {
    const dial = twiml.dial({ callerId })
    // If it looks like a phone number dial it directly
    if (to.startsWith('+') || to.startsWith('00')) {
      dial.number({}, to)
    } else {
      // Otherwise connect to another browser client
      dial.client({}, to)
    }
  } else {
    twiml.say('No destination specified')
  }

  return new NextResponse(twiml.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  })
}