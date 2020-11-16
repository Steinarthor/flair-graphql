import AuthAPI from "./datasources/auth";
import UserAPI from "./datasources/user";
import EventsAPI from "./datasources/events";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers/resolvers";

const typeDefs = importSchema("schema.graphql");
const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  dataSources: () => {
    return {
      authAPI: new AuthAPI(),
      userAPI: new UserAPI(),
      eventsAPI: new EventsAPI(),
    };
  },
  context: ({ req }) => ({
    token: req.headers.authorization,
  }),
});
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
