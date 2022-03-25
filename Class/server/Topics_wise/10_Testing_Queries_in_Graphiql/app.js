const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
const port = 8080;
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    // to test out the query we can't use http request so because of that we will use graphiql tool and we have to set it true
    graphiql: true,
    /*
      query on GraphiQL:
        {
          book(id:"1"){
            name,
            genre,
          }
        }
      
      response:
        {
          "data": {
            "book": {
              "name": "Alchemist",
              "genre": "Fiction"
            }
          }
        }
    */
  })
);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
