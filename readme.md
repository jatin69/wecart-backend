# WeCart GraphQL API Server

WeCart is an eCommerce platform providing shared cart feature.

## Getting Started

### Pre-requisites

- `yarn` is used as the package manager. So the same is recommended. However, you may also use `npm`
- Install `docker` and `docker-compose`, needed to host `postgresql` and `prisma` containers
- we will need to deploy schema to containers via the `prisma cli`. 
- Make sure `prisma-cli` is globally installed. `yarn global add prisma-cli`

### Setting up

- `git clone` the repo. Then `cd` to the folder
- run `yarn` to install required dependencies
- `cp .env.example .env` : make a copy of .env.example file
- `docker-compose up -d` : Spin up containers for postgresql and prisma
- `prisma deploy -e .env` : create prisma client API for your schema. This needs to be run everytime you change your schema.
- `yarn start` : start the Apollo Server 

### Moving around

- API Server is at : `http://localhost:4040/`
- Use Prisma server as dev :`http://localhost:4466/wecart/dev`
- Browse to `http://localhost:4466/_admin` to add/edit data to database
- This URL will probably give an error because you have not provided secret token yet.
- go to prisma folder `cd prisma` in the project 
- generate a token `prisma token -e ./../.env`
- copy the token and paste in the the settings of `http://localhost:4466/_admin` in the browser.
- You can now access to prisma admin. You can run admin queries here.

### Hosting on cloud

- If you do not wish to setup docker on your machine, you can also host the containers on VM instances, or any remote endpoint. 
- Simply install `docker` via snap. Open port `4466` if blocked by default firewall.
- change the prisma access URL to `<VM URL>:4466` in your `.env`

### Initial queries

- First create a user 
	```
	mutation{
	  createUser(name:"Jatin Rohilla", email:"jatin@ducs.in", password:"jatin" ){
	    id,
	    email,
	    name,
	    isAdmin
	  }
	}
	```
- Then login. Note down the obtained token.
	```
	{
	  login(email:"jatin@ducs.in", password:"jatin"){
	    user{
	      name
	    },
	    token,
	    message
	  }
	}
	```
- Run queries. In http header, pass authorization token obtained in previous step.
	```
	{
	  users{
	    name,
	    email,
	    isAdmin
	  }
	}
	```
	```
	{
	  "authorization": "Bearer <token>"
	}
	```

## Development

### Editors and Extensions

- Recommended editor is `VS Code`
- Recommended extension is [`graphql-for-vscode`](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode). This extension works across files and works well. Install the extension dependencies, and other steps mentioned on the extension page. 

## References

### Resources

- [Graphql spec](https://graphql.github.io/graphql-spec/June2018/)
- Example graphql API - [Github's Graph API explorer](https://developer.github.com/v4/explorer/)
- `Frontend` [Let's learn to graphql](https://letslearngraphql.com/workshop/1)
- `backend` [How to GraphQL](https://www.howtographql.com/basics/0-introduction/)
- `backend` [Prisma - Getting Started](https://www.prisma.io/docs/get-started/01-setting-up-prisma-new-database-JAVASCRIPT-a002/)
- `Udemy Course` Preview of [Udemy - The Modern GraphQL Bootcamp (Advanced Node.js)](https://www.youtube.com/watch?v=j3wbyAaLbDE)

### some github links

- [github.com/nareshbhatia/graphql-bookstore](github.com/nareshbhatia/graphql-bookstore)
- [github.com/SaraVieira/graphql-workshop](github.com/SaraVieira/graphql-workshop)
- [github.com/FrontendMasters/intro-to-graphql](github.com/FrontendMasters/intro-to-graphql)
- [github.com/prisma/prisma-examples](github.com/prisma/prisma-examples)
- [github.com/siddhant1/E-Shopp-Backend](github.com/siddhant1/E-Shopp-Backend)
- [github.com/howtographql/graphql-js](github.com/howtographql/graphql-js)
- [github.com/cpenarrieta/prisma-apollo-2.0](github.com/cpenarrieta/prisma-apollo-2.0)