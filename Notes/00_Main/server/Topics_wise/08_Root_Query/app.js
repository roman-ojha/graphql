const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
const port = 8080;

/*
  -> now we had already define 'books' type on schema and another thing could be to define relation type
  -> but right now we will define a root queries

  *) Root queries:
      -> root queries is how do we initially get into the graph to grab data
      -> so we will define root queries on schema file
*/

app.use("/graphql", graphqlHTTP({ schema: schema }));

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
