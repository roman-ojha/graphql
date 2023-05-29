import { QueryResolvers, User } from "../graphql/generated/types";

export default <QueryResolvers>{
  getUser: async (__, args, ctx, info) => {
    return <any>null;
  },
  getPost: async (__, args, ctx, info) => {
    return <any>null;
  },
  getUsers: async (__, _, ctx, info) => {
    console.log(ctx);
    return <any>null;
  },
  getPosts: async (__, _, ctx, info) => {
    return <any>null;
  },
};
