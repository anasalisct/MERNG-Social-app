const { ApolloServer } = require("apollo-server");

const typeDefs = require("./graphQL/typeDefs");
const mongoose = require("mongoose");
const resolvers = require("./graphQL/resolvers");

// tag template string

// each query has a resolver

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(
    "mongodb+srv://anas:anas@cluster0.qv9tf.mongodb.net/social-app?retryWrites=true&w=majority",
    { useUnifiedTopology: true },
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("mongoDB connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log("server is running", `${res.url}`);
  });
