// prisma can be easily switches, changes will only be here

const { Prisma } = require('prisma-binding');

const prisma = new Prisma({
	typeDefs: 'database/generated/prisma.graphql',
	endpoint: process.env.PRISMA_ENDPOINT,
	secret: process.env.PRISMA_SECRET,
	debug: false,
});
module.exports = prisma;
