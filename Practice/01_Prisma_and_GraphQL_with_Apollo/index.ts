import { ApolloServer } from "@apollo/server";
import { readFileSync } from "fs";

const typeDefs = readFileSync("./schema/schema.graphql", { encoding: "utf-8" });

const server = new ApolloServer({
  typeDefs,
});
