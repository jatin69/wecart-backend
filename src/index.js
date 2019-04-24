require('dotenv').config();

const { ApolloServer } = require('apollo-server');

const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const schemaDirectives = require('./directives');
const context = require('./context');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	schemaDirectives,
	context,
});

server.listen({ port: process.env.SERVER_PORT }).then(({ url, server }) => {
	console.log(`Server is running on ${url}`);
});
