import { PrismaClient } from "@prisma/client";
import { Request, Response, request } from "express";

export interface Context {
  // db: PrismaClient;
  req: Request;
  res: Response;
}

const createContext = (
  req: Request,
  res: Response
  // db: PrismaClient
): Context => {
  // console.log(db);
  return {
    // db,
    req,
    res,
  };
};

export { createContext };
