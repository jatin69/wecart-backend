const cartResolver = {
	Query: {
		async carts(_, __, { db, req: {user} }) {
			// Todo
		},
		cart(_, { cartId }, { db, user }) {
			// Todo
		},
	},
	Mutation: {
		async createCart(_, { name }, { db, req: {user} }) {
			const cartmember = await db.mutation.createCartMember({
				data: {
					cart: {
						create: {
							name
						}
					},
					member: {
						connect: {id: user.id}
					}
				},
			});

			console.log(cartmember.cart());
			
			return Promise.resolve(cartmember.cart);
		}
	},
};

exports.default = cartResolver;
