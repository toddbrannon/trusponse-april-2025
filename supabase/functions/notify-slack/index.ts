import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const SLACK_WEBHOOK_URL = Deno.env.get('SLACK_WEBHOOK_URL')

serve(async (req) => {
  if (!SLACK_WEBHOOK_URL) {
    console.error('Missing SLACK_WEBHOOK_URL environment variable')
    return new Response(
      JSON.stringify({ error: 'Server configuration error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const { record } = await req.json()

  // Format the message
  const message = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🎯 New Lead Submission",
          emoji: true
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Contact:*\n${record.name}`
          },
          {
            type: "mrkdwn",
            text: `*Company:*\n${record.company_name}`
          }
        ]
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Email:*\n${record.email}`
          },
          {
            type: "mrkdwn",
            text: `*Phone:*\n${record.phone || 'Not provided'}`
          }
        ]
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Services:*\n${record.services.join(', ')}`
          }
        ]
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Budget:*\n${record.budget || 'Not specified'}`
          },
          {
            type: "mrkdwn",
            text: `*Timeline:*\n${record.timeframe || 'Not specified'}`
          }
        ]
      }
    ]
  }

  try {
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error sending Slack notification:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to send notification' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})