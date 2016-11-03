import koa from "koa";
import mount from "koa-mount";
import cacheControl from "koa-cache-control";
import apiErrorHandler from "../util/api-error-handler";
import { RegisterApi as registerApi } from "./routes";
import { LoginApi as loginApi } from "./routes";
import { UserApi as userApi } from "./routes";


export default function Api() {
  const api = koa();

  api.use(apiErrorHandler);
  api.use(mount("/register", registerApi));
  api.use(mount("/login", loginApi));
  api.use(mount("/user", userApi));
  api.use(function* terminator() {
    return;
  });

  return api;
}
