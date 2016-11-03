import jwtUtils from "../jwt-utils";

export default function* (next) {
  const token = this.req.headers.authorization || this.cookies.get("authorization");
  let validToken;
  let userUid;
  try {
    validToken = jwtUtils.verify(token);
    userUid = validToken.uuid;
  } catch (err) {
    validToken = false;
  }
  if (validToken) {
    this.redirect("/");
    return;
  }
  yield next;
}
