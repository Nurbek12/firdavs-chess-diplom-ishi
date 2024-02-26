const { connect, set } = require('mongoose')

set('strictQuery', false)

module.exports = async () => connect(process.env.MONGO)
    .then(() => console.log('db connect...'))
    .catch(err => console.log('db err:', err))