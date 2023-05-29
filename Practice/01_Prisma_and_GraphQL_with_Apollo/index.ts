import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { readFileSync } from "fs";
import { createContext } from "./graphql/context.js";
import { resolvers } from "./resolvers/index.js";
import { PrismaClient } from "@prisma/client";

const typeDefs = readFileSync("./schema/schema.graphql", { encoding: "utf-8" });

const app = express();
const httpServer = http.createServer(app);

const prisma = new PrismaClient();

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => createContext(req, res),
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 8080 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:8080/`);
