const Post = require("../../models/Post");
const checkAuth = require("../../utils/checkAuth");
const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Query: {},
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username } = checkAuth(context);
      try {
        if (body.trim() === "") {
          throw new UserInputError("Empty comment");
        }
        const post = await Post.findById(postId);
        if (post) {
          console.log("hellloo1");
          post.comments.unshift({
            body,
            username,
            createdAt: new Date().toISOString(),
          });
          console.log("hellloo1");
          await post.save();

          //   const post = await newPost.save();
          console.log("hellloo1");

          return post;
        } else {
          throw new UserInputError("Post not Exists");
        }
      } catch (error) {}
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (post) {
          const commentIndex = await post.comments.findIndex(
            (c) => c.id == commentId
          );
          if (post.comments[commentIndex].username === username) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError("action not allowed");
          }
        } else {
          throw new UserInputError("Post not Exists");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
