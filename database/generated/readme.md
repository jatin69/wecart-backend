## auto generated file

- user writes `datamodel.prisma` as per his requirements.
- then `prisma deploy` command creates `schema.graphql`
- This happens because -
  - prisma takes our datamodel, creates a database, then converts our database to a graphql api. 
  - It has lots and lots of queries, and mutations by default. 
  - These help us in writing queries. 
  - These all are not shown to user.
- For user documentation and graphql API interface, we pass user written `typedefs` folder to apollo server. These file have `.gql` extension