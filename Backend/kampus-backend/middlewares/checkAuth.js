const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
	const token = req.cookie.jwt;
	//! if token exists then validate
	if (token) {
		jwt.verify(token, process.env.secret, (err, decodedId) => {
			if (err) {
				console.log(err);
				req.isLogggedIn = false;
			} else {
				console.log(decodedId);
				req.isLogggedIn = true;
				req.decodedId = decodedId;
			}
			next();
		});
	} else {
		req.isLogggedIn = false;
		next();
	}
};

module.exports = checkAuth;
