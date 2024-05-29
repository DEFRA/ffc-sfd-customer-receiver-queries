const cosmosClient = require('./client')
const { cosmosConfig } = require('../config')

const queriesDatabase = async () => {
  try {
    const { database } = await cosmosClient.databases.createIfNotExists({
      id: cosmosConfig.queriesDatabase
    })

    await database.containers.createIfNotExists({
      id: cosmosConfig.queriesContainer
    })

    console.log(`A CosmosDB database has been created: ${database.id}.`)

    return database
  } catch (error) {
    console.error('Error creating Cosmos instance:', error)
  }
}

module.exports = { queriesDatabase }
