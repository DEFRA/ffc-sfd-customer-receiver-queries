const { CosmosClient } = require('@azure/cosmos')
const { cosmosConfig } = require('../config')

module.exports = new CosmosClient({
  endpoint: cosmosConfig.endpoint,
  key: cosmosConfig.key
})
