export const typeDefs = `#graoghql

    type Author {
        id: ID!,
        name: String!,
        books: [Book]
    }

    type Book {
    id: ID!,
    title : String!,
    publichedYear: Int
    author: Author 
    }


    type Query {
        authors: [Author]
        books: [Book]

    }


`;
