const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
        // get current login user, which is me
        // use Context to validate
        // populate the Schema book for savedbook in User
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select("-__v -password")
                    .populate("books");

                return userData;
            }

            throw new AuthenticationError("Not logged in");
        },
    },
    Mutation: {
        // provide token to newly add user
        addUser: async (parent, args) => {
            try {
                const user = await User.create(args);

                const token = signToken(user);
                return { token, user };
            } catch (err) {
                console.log(err);
            }
        },
        // handle the login by checking hashed password in User model
        // then provide token to login user
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);
            return { token, user };
        },
        // save or add book to User's savedbook
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    // take the input type to replace "body" as the arguement
                    { $addToSet: { savedBooks: args.input } },
                    { new: true, runValidators: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        // remove book from User's saved book
        removeBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
    },
};

module.exports = resolvers;
