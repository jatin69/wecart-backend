// these typedefs define the interface of GRAPHQL API

const path = require('path');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');

const typeDefsArray = fileLoader(path.join(__dirname, './typedefs'));
const typeDefs = mergeTypes(typeDefsArray, { all: true });

module.exports = typeDefs;
