// limited contexts are passed, this file is enough

const jwt = require('jsonwebtoken'); // JWT for authorization
const db = require('../database'); // db for database

const context = async ({ req }) => {
	if (req.headers.authorization) {
		try {
			const token = req.headers.authorization.replace('Bearer ', '');
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await db.query.user({
				where: { email: decoded.email },
			});
			req.invalidToken = false;
		} catch (e) {
			req.user = null;
			req.invalidToken = true;
		}
	}
	return {
		req,
		db,
	};
};

module.exports = context;
