const gqlServer = require('express-graphql')
const express = require('express')
const cors = require('cors')
const schema = require('./GQL/schema')
const bodyParser = require('body-parser')
require('./db/mongoose')

var app = express()
process.env.PORT = 4000

var graphQLOptions = new gqlServer({
    schema,
    pretty: true,
    graphiql: true
})

app.use(bodyParser.json())
app.use('/gql', graphQLOptions);

app.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT}`)
})