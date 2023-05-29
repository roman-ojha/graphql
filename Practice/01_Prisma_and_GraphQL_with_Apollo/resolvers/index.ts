import query from "./query.js";
import mutation from "./mutation.js";
import { Resolvers } from "../graphql/generated/types";

export const resolvers = <Resolvers>{
  Query: query,
  Mutation: mutation,
};
