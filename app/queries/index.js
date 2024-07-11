const util = require('util')
const { queryConfig } = require('../config')
const { MessageReceiver } = require('ffc-messaging')
const { sendNotification } = require('./send-notification')

const handleMessage = async (message, receiver) => {
  try {
    console.log('Received message:', message.body)
    await sendNotification(message)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Message error', util.inspect(err.message, false, null, true))
  }
}

const startMessaging = async () => {
  let queriesReceiver //eslint-disable-line
  const receiverAction = (message) => handleMessage(message, queriesReceiver)
  queriesReceiver = new MessageReceiver(
    queryConfig.receiverSubscription,
    receiverAction
  )
  await queriesReceiver.subscribe()
  console.info('Queries receiver is ready to consume messages')
}

module.exports = { startMessaging }
