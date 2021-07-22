// @ts-check

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
const PORT = 5000;

app.use("/graphql", graphqlHTTP({
   graphiql: true,
   schema
}))

app.listen(PORT, () => {
   console.log(`App started on ${PORT}`);
})