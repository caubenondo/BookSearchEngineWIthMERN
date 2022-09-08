const { gql } = require("apollo-server-express");

const typeDefs = gql`
    // find current user
    type Query {
        me: User
    }
    // data mutating functions
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: savedBook!): User
        removeBook(bookId: ID!): User
    }
    // User model
    type User {
        _id: ID!
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    // Book model or schema
    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    // savebbook in Users
    input savedBook {
        description: String
        title: String
        bookId: String
        image: String
        link: String
        authors: [String]
    }
    // for JWT Auth
    type Auth {
        token: ID!
        user: User
    }
`;

// export the typeDefs
module.exports = typeDefs;
