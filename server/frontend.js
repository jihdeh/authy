"use strict";

import staticCache from "koa-static-cache";
import serve from "koa-static";
import path from "path";
import koa from "koa";
import koaRouter from "koa-router";
import renderApp from "./render-app";
import jwtUtils from "./jwt-utils";
import User from "./models/user-model";
import sessionMiddleton from "./base/session-middleware";

export default function Frontend() {
  const server = koa();
  const router = koaRouter();

  router.get("/", function*(next) {
    yield next;
    const token = this.req.headers.authorization || this.cookies.get("authorization");
    let validToken;
    let userUid;
    try {
      validToken = jwtUtils.verify(token);
      userUid = validToken.uuid;
    } catch (err) {
      validToken = false;
    }
    if (!validToken) {
      this.redirect("/login");
      return;
    }
    const user = yield User.findOne({ uuid: userUid }).select("username email").lean().exec();
    let data = {
      user
    }
    this.body = renderApp(this, "homepage", data);
  });

  router.get("/register", sessionMiddleton, function*() {
    this.body = renderApp(this, "Register", {});
  });

  router.get("/login", sessionMiddleton, function*() {
    this.body = renderApp(this, "Login", {});
  });

  router.get("/success", sessionMiddleton, function*() {
    this.body = renderApp(this, "Successful Registration", {});
  });

  router.get("/verify", function*() {
    this.body = renderApp(this, "Verify", {});
  });

  return server
    // .use(staticCache({ maxage: 60 * 100000 })) // Cache all pages for 1 hour
    .use(serve(path.join(__dirname, "../static")))
    .use(serve(path.join(__dirname, "../dist")))
    .use(router.routes())
}
