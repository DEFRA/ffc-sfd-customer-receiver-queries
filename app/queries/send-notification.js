const NotifyClient = require('notifications-node-client').NotifyClient

const sendNotification = async (message) => {
  try {
    const notifyClient = new NotifyClient(process.env.NOTIFY_API_KEY)

    const latestResponse = message.body.responses[0]

    if (latestResponse.internalUser) {
      const emailPayload = {
        personalisation: {
          heading: latestResponse.heading,
          content: latestResponse.body
        },
        reference: message.body.id
      }

      await notifyClient.sendEmail(
        process.env.NOTIFY_TEMPLATE_ID,
        process.env.NOTIFY_TEST_EMAIL,
        emailPayload
      )

      console.log('Notify has sent an email notification: internalUser is true.')
    }
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.data : error.message)
  }
}

module.exports = { sendNotification }
