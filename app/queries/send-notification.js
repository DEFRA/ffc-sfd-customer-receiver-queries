// const { v4: uuidv4 } = require('uuid')
const NotifyClient = require('notifications-node-client').NotifyClient

const sendNotification = async (message) => {
  const notifyClient = new NotifyClient(process.env.NOTIFY_API_KEY)

  if (message.body.responses.internalUser) {
    await notifyClient.sendEmail(
      process.env.NOTIFY_TEMPLATE_ID,
      process.env.NOTIFY_TEST_EMAIL,
      {
        personalisation: {
          heading: message.body.responses.heading,
          content: message.body.responses.body
        },
        reference: message.body.id
      }
    )

    console.log('Notify has sent an email notification: internalUser is true.')
  } else {
    console.log('Notify has not sent an email notification: internalUser is false.')
    console.log(message.body.responses[0].internalUser)
  }
}

module.exports = { sendNotification }
