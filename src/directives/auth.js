const {
	SchemaDirectiveVisitor,
	AuthenticationError,
} = require('apollo-server');
const { defaultFieldResolver } = require('graphql-tools');

class RequireAuthenticationDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;
		const { admin = false } = this.args;
		field.resolve = async (...args) => {
			const [, , ctx] = args;

			if (ctx.req && ctx.req.user) {
				if (admin && !ctx.req.user.isAdmin) {
					throw new AuthenticationError(
						`You are not allowed to access "${field.name}".`,
					);
				} else {
					const result = await resolve.apply(this, args);
					return result;
				}
			} else {
				throw new AuthenticationError(
					`You must be signed in to view "${field.name}".`,
				);
			}
		};
	}
}

module.exports = RequireAuthenticationDirective;
