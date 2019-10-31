const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    me: User
  }
  
  type User {
    id: ID
    name: String,
    children:User
  }
`);
const user = { id: 21523454, name: 'my name is ' };
// 定义不同字段应该如何拿到数据
const root = {
    me: () => user,
    id: () => user.id,
    name: () => user.name,
    children: () => user
};

const app = express();
// 具体查询url 注意和以前的方式不一样
// http://localhost:4000/graphql?query={hello,name,age,...}
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));