

const data = {
    authors: [
        {id: "1", name: "Ashish Singh", bookIds: ["101","102"]},
        {id: "2", name: "Ashish", bookIds: ["103"]},
    ],
    books : [
       {id: "101", title: "Book1", publichedYear: 2000, authorId: "1"}
    ]
}

export const resolvers = {
    Query: {
        authors : () => {
            return data.authors
        },
        books: () => {
           return data.books
        }
    }
}