const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	// console.log(token);
	//! if token exists then validate
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedId) => {
			if (err) {
				console.log(err);
				return res.json({
					isLogggedIn: false,
				});
			} else {
				// console.log(decodedId);
				res.locals.isLogggedIn = true;
				res.locals.decodedId = decodedId.id;
				next();
			}
		});
	} else {
		return res.json({
			isLogggedIn: false,
		});
	}
};

module.exports = checkAuth;
