import jwt from "jsonwebtoken";
import {authorization} from "../config/login";

module.exports = {
	sign: function(uuid) {
		return jwt.sign({uuid}, authorization.secret, {
			algorithm: "HS256",
			expiresIn: authorization.expiration_interval});
	},

	verify: function(token) {
		return jwt.verify(token, authorization.secret, {algorithms: ["HS256"]});
	},

	store: function(ctx, signedToken) {
		ctx.response.set("authorization", signedToken);
		ctx.cookies.set("authorization", signedToken);
	}
};
