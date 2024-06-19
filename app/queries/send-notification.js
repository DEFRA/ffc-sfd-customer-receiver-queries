const { v4: uuidv4 } = require('uuid')
const NotifyClient = require('notifications-node-client').NotifyClient

const sendNotification = async (message) => {
  const notifyClient = new NotifyClient(process.env.NOTIFY_API_KEY)

  if (message.body.internalUser) {
    await notifyClient.sendEmail(
      process.env.NOTIFY_TEMPLATE_ID,
      process.env.NOTIFY_TEST_EMAIL,
      {
        personalisation: {
          heading: message.body.heading,
          content: message.body.body
        },
        reference: uuidv4()
      }
    )

    console.log('Notify has sent an email to the external user: internalUser is set to true.')
  } else {
    console.log('Notify did not send email: internalUser is false.')
  }
}

module.exports = { sendNotification }
