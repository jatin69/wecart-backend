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

### Development

## Editors and Extensions

- Recommended editor is `VS Code`
- Recommended extension is [`graphql-for-vscode`](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode). This extension works across files and works well. Install the extension dependencies, and other steps mentioned on the extension page. 