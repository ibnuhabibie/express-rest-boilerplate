const { IncomingWebhook } = require('@slack/client')

const { capitalize } = require('../helper/string')

const url = process.env.SLACK_WEBHOOK_URL
const webhook = new IncomingWebhook(url)



const sendToChannel = async (err, req) => {
  let data = {
    attachments: [
      {
        color: 'danger',
        title: 'Internal Server Error',
        text: `${req.method} :: ${req.originalUrl}`,
        fields: [{
          title: 'Error-stack',
          value: "```"+err.stack+"\nProperties\n"+JSON.stringify(err.properties, null, '\t')+"```",
          short: false
        }],
        footer: process.env.APP_NAME,
        ts: Math.floor(Date.now() / 1000),
        mrkdwn_in: ['fields']
      }
    ]
  }

  let fieldsWithLongValue = ['user-agent', 'accept']

  Object.keys(req.headers).forEach(key => {
    let short = (fieldsWithLongValue.includes(key)) ? false : true

    data.attachments[0].fields.push({
      title: capitalize(key),
      value: req.headers[key],
      short: short
    })
  })

  webhook.send(data, (err, res) => {
    console.log('Slack Incoming Webhook')
    if (err) {
      console.error('Error: ', err)
    } else {
      console.log('Message sent: ', res)
    }
  })
}

module.exports = {
  sendToChannel
}