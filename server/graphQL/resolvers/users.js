const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    "some very secrete key",
    { expiresIn: "1h" }
  );
}
module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError("Wrong credientials", {
          errors: {
            username: "this username has not exists",
          },
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new UserInputError("Wrong credientials", {
          errors: {
            password: "this username has not exists",
          },
        });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, password, confirmPassword, email } }
    ) {
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username already taken", {
          errors: {
            username: "this username has been taken",
          },
        });
      }
      // validate user data
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
