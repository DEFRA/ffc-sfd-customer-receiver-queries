const cosmos = require('../cosmos')
const { cosmosConfig } = require('../config')

const saveToCosmos = async (message) => {
  try {
    const { queriesDatabase } = await cosmos()
    const container = queriesDatabase.container(cosmosConfig.queriesContainer)

    const { resource: existingItem } = await container.item(message.body.id).read()

    existingItem.responses = existingItem.responses || []
    existingItem.responses.unshift(...message.body.responses)

    await container.item(message.body.id).upsert(existingItem)

    console.log('Message saved to CosmosDB:', message.body)
  } catch (error) {
    console.error('Error saving message to Cosmos:', error)
  }
}

module.exports = { saveToCosmos }
