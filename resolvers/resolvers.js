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
        email: userResponse.email,
      };
    },
    event: async (_, { id }, { dataSources }) => {
      return await dataSources.eventsAPI.getEvent(id);
    },
    eventCategory: async (_, { category, location }, { dataSources }) => {
      return await dataSources.eventsAPI.getEventCategory(category, location);
    },
    eventLocation: async (_, { location }, { dataSources }) => {
      return await dataSources.eventsAPI.getEventLocation(location);
    },
    events: async (_, { location, month, date }, { dataSources }) => {
      // add date also
      return await dataSources.eventsAPI.getEvents(location, month, date);
    },
  },
  Mutation: {
    login: async (_, { input }, { dataSources }) => {
      // Here could be email validation etc.

      if (!input.email && !input.password) {
        throw new UserInputError("Please provide email or password", {
          invalidArgs: ["Email", "Password"],
        });
      }

      if (!input.email) {
        throw new UserInputError("Please provide email", {
          invalidArgs: "Email",
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
      if (!input.email || !input.password || !input.name || !input.email) {
        throw new AuthenticationError("Please provide credentials");
      }
      try {
        const singupResponse = await dataSources.authAPI.signup(input);
        return {
          status: singupResponse.Status,
          token: singupResponse.Token,
          message: singupResponse.Message,
        };
      } catch (error) {
        throw new AuthenticationError(error);
      }
    },
    addEvent: async (_, __, { dataSources }) => {
      return await dataSources.eventsAPI.addEvent();
    },
    addUser: async (_, { input }, { dataSources }) => {
      try {
        const addUserResponse = await dataSources.userAPI.addUser(input);
        return {
          id: addUserResponse.id,
          name: addUserResponse.name,
          email: addUserResponse.email,
        };
      } catch (error) {
        throw new AuthenticationError(error);
      }
    },
  },
};
