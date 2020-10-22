import {
  ApolloError,
  AuthenticationError,
  UserInputError,
} from "apollo-server";

export const resolvers = {
  Query: {
    user: async (_, __, { dataSources }) => {
      const userResponse = await dataSources.userAPI.user();
      return {
        id: userResponse.id,
        name: userResponse.name,
        username: userResponse.username,
        email: userResponse.email,
      };
    },
  },
  Mutation: {
    login: async (_, { input }, { dataSources }) => {
      // Here could be email validation etc.

      if (!input.username && !input.password) {
        throw new UserInputError("Please provide username", {
          invalidArgs: ["Username", "Password"],
        });
      }

      if (!input.username) {
        throw new UserInputError("Please provide username", {
          invalidArgs: "Username",
        });
      }

      if (!input.password) {
        throw new UserInputError("Please provide password", {
          invalidArgs: "Password",
        });
      }

      try {
        const loginResponse = await dataSources.authAPI.login(input);
        const { Status, Token, Message } = loginResponse;
        return {
          status: Status,
          token: Token,
          message: Message,
        };
      } catch (error) {
        throw new ApolloError("Invalid Credentials", 401, {
          errorType: "LOGIN",
        });
      }
    },
    signup: async (_, { input }, { dataSources }) => {
      if (!input.username || !input.password || !input.name || !input.email) {
        throw new AuthenticationError("Please provide credentials");
      }
      try {
        return {
          token: dataSources.authAPI.signup(input),
        };
      } catch (error) {
        throw new AuthenticationError(error);
      }
    },
  },
};
