import koa from "koa";
import koaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
import queryRoutes from "../base/register-routes";
import validator from "../../util/validator";
import User from "../models/user-model";


const api = koa();
const router = koaRouter();

api.use(bodyParser());
router.post("/", validator, function*(next) {
	const user = yield User.findOne({email: this.request.body.email});
	if(user) {
		return this.throw(403, "User Already Exist");
	}
	yield next;
}, queryRoutes.registerUser);

api
  .use(router.routes())
  .use(router.allowedMethods());

export default api;
