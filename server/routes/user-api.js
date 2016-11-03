import koa from "koa";
import koaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
import queryRoutes from "../base/user-routes";

const api = koa();
const router = koaRouter();

api.use(bodyParser());

router.get("/", queryRoutes.fetchUser);

api
  .use(router.routes())
  .use(router.allowedMethods());

export default api;
