import User from "./models/user-model";
import jwtUtils from "./jwt-utils";
import {authorization} from "../config/login";

export default function() {
	return function*(next) {
		const token = this.req.headers.authorization || this.cookies.get("authorization");
		if (!token) return yield next;
		let decoded;
		try {
			decoded = jwtUtils.verify(token);
		} catch (err) {
			decoded = false;
		}

		if (!decoded) return yield next;
		var user = yield User.findOne({uuid: decoded.uuid}).select("username email");
		if (!user) return yield next;
		const interval = (decoded.exp * 1000 - Date.now()) / 1000;
		if (interval < authorization.refresh_interval) {
			const signedToken = jwtUtils.sign(user.uuid);
			console.log("Refresh token:");
			console.log(signedToken);
			jwtUtils.store(this, signedToken);
		}

		this.request.user = user;
		console.log(user);
		yield next;
	};
}
