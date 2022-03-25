/*
  -> npm install graphql
  -> npm i express-graphql (to make express understand about graphql, because in default express doesn't understand graphql)
*/

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
// express graphql package will make express to understand about graphql
// and provide the simple way for express server that runs the graphql api
// so to achieve that we will use it on a middleware on a single route
// so this route will be an one supercharged endpoint to interact with graphql data
const app = express();
const port = 8080;

app.use("/graphql", graphqlHTTP({}));
// so this will be the supercharged endpoint that will handel all the query
// graphqlHTTP({<graphql_schema>})

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
