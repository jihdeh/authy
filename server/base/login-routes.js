import User from "../models/user-model";

function* loginUser(next) {
  const user = yield User.findOne({ email: this.request.body.email });
  if (user) {
      const signedToken = jwtUtils.sign(user.uuid);
      jwtUtils.store(this, signedToken);
      this.status = 200;
  } else {
    this.status = 404;
    this.body = "No User Found";
  }
}

export default { loginUser }
