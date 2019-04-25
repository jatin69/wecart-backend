const productResolver = {
    Query: {
        products(_, __, { db }) { 
			return db.query.products();
		},
		product(_, args, { db }) {
			return db.query.product({ where: { id: args.productId } });
		},
    },
    Mutation: {
        createProduct(_, {name, price, description}, { db }){
            return db.mutation.createProduct({
                data: {
                    name, price,
                    description: description || 'description',
                }
            });
        },
        deleteProduct(_, {productId}, { db }){
            return db.mutation.deleteProduct({where: {id: productId}})
        }
    }
}

exports.default = productResolver;