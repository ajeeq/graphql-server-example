// RESOURCES: 
// - https://fullstackopen.com/en/part8/react_and_graph_ql#doing-mutations
// - https://www.ibrahima-ndaw.com/blog/graphql-api-express-mongodb/

const express = require("express")
const cors = require('cors')
const { graphqlHTTP } = require("express-graphql")
const mongoose = require("mongoose")
const graphqlSchema = require("./graphql/schemas")
const graphqlResolvers = require("./graphql/resolvers")
require("dotenv").config()

const app = express()

app.use(cors())
app.use("/graphql", graphqlHTTP ({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
    })
)
  
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri, options)
    .then(() => app.listen(4000, console.log("Server is running")))
    .catch(error => {
        throw error
    })
