const { queriesDatabase } = require('./database')

const cosmos = async () => {
  const cosmos = {}
  cosmos.queriesDatabase = await queriesDatabase()
  return cosmos
}

module.exports = cosmos
