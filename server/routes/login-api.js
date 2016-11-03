import koa from "koa";
import koaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
import queryRoutes from "../base/login-routes";
import validator from "../../util/validator";
import { loginRequired } from "../base/middleware";
import { create, authyStatus, destroy, authyCallback, verify, resend } from "../base/sessions";


const api = koa();
const router = koaRouter();

api.use(bodyParser());

// router.post("/", validator, queryRoutes.loginUser);
// Create a new session
router.post("/session", create);

// Log out (destroy a session)
router.delete("/session", loginRequired, destroy);

// Check the OneTouch status on the user
router.get("/authy/status", authyStatus);

// The webhook that Authy will call on a OneTouch event
router.post("/authy/callback", bodyParser(), authyCallback);

// Validate the given session with an Authy 2FA token
router.post("/session/verify", verify);

// resend an authorization token
router.post("/session/resend", resend);

api
  .use(router.routes())
  .use(router.allowedMethods());

export default api;
