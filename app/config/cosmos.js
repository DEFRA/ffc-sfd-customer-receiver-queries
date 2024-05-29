const Joi = require('joi')

const schema = Joi.object({
  endpoint: Joi.string().required(),
  key: Joi.string().required(),
  queriesDatabase: Joi.string().required(),
  queriesContainer: Joi.string().required()
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
