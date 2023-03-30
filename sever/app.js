const express = require('express')
const graphglHTTP = require('express-graphql')

const app = express()

app.use("/graphql", graphglHTTP )
app.listen(4000, () => {
    console.log("listening for request 4000")
})

