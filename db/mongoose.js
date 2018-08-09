const mongoose = require('mongoose')

const MONGODB_URL = "mongodb://brajesh:yesha#123@ds231758.mlab.com:31758/blyricaldb"

mongoose.Promise = global.Promise
mongoose.connect(MONGODB_URL, {useNewUrlParser: true})
mongoose.connection.once('open', () => {
    console.log(`mongo is running on ${MONGODB_URL}`)
})
.on('error', (args) => {
    console.log(args)
    console.log('Error connecting to mongodb database')
})

module.exports = { mongoose }