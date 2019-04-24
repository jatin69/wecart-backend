const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');

const userResolver = {
	Query: {
		async users(_, __, { db }) {
			return db.query.users();
		},
		user(_, args, { db }) {
			return db.query.user({ where: { id: args.userId } });
		},
		async login(_, { email, password }, { db }) {
			const user = await db.query.user({ where: { email } });

			if (!user || !compareSync(password, user.password)) {
				return Promise.resolve({
					token: null,
					user: null,
					message: 'Incorrect email or password',
				});
			}

			//valid for 30 days.
			const token = jwt.sign(
				{ userId: user.id, email: user.email },
				process.env.JWT_SECRET,
				{ expiresIn: 60 * 60 * 24 * 30 },
			);

			return Promise.resolve({ user, token, message: 'Logged In!' });
		},
	},
	Mutation: {
		createUser(_, { name, email, password }, { db }) {
			return db.mutation.createUser({
				data: {
					name,
					email,
					password: hashSync(password, 10),
					isAdmin: false,
				},
			});
		},
	},
};

module.exports = userResolver;
