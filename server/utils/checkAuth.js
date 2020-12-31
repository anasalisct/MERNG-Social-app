const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    //   bearer ...
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, "some very secrete key");
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid/ Expire token");
      }
    }
    throw new Error("Authentication token not provided3");
  }
  throw new Error("Authentication header not provided");
};
