const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const port = 8080;

app.use("/graphql", graphqlHTTP({}));

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
