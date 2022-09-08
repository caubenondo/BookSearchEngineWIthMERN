import gql from "graphql-tag";

// copy and paste these queries from Apollo Expolorer
export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                image
                link
                title
                description
            }
        }
    }
`;
