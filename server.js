const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Book {
    title: String
    author: Author
  }
  type Author{
    name: String
    books: [Book]
  }
  type Query {
    books: [Book]
    getBooks: [Book]
    getAuthors: [Author]
  }

# Mutation 写的操作
    type Mutation{
        addBook(title:String,author:String):Book
    }
`;
const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: {
            name: 'namexx',
            books: []
        },
    },
    {
        title: 'Jurassic Park',
        author: {
            name: 'namexx',
            books: []
        },
    }

];
// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        books: () => books,
        getBooks: () => books,
        getAuthors: () => books.map((item) => item.author),
    },
    Mutation: {
        // $ 对应获取参数 注意要和你定义的字段对应
        addBook: ($title, $author) => {
            console.log($title, $author);
            books.push({
                title: $title,
                author: {
                    name: $author
                }
            });
            return books;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);