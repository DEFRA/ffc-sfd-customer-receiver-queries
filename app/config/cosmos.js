const Joi = require('joi')

const schema = Joi.object({
  endpoint: Joi.string().optional(),
  key: Joi.string().optional(),
  queriesDatabase: Joi.string().optional().default('ffc-sfd-customer-receiver-queries'),
  queriesContainer: Joi.string().optional().default('queries-container')
})

const config = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
  queriesDatabase: 'ffc-sfd-customer-receiver-queries',
  queriesContainer: 'queries-container'
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The CosmosDB config is invalid. ${error.message}`)
}

module.exports = value
