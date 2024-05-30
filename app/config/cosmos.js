const Joi = require('joi')

const schema = Joi.object({
  endpoint: Joi.string(),
  key: Joi.string(),
  queriesDatabase: Joi.string().default('ffc-sfd-customer-receiver-queries'),
  queriesContainer: Joi.string().default('queries-container')
})

const config = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
  queriesDatabase: process.env.COSMOS_QUERIES_DATABASE,
  queriesContainer: process.env.COSMOS_QUERIES_CONTAINER
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The CosmosDB config is invalid. ${error.message}`)
}

module.exports = value
