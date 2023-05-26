const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
const port = 8080;
app.use("/graphql", graphqlHTTP({ schema: schema }));

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
