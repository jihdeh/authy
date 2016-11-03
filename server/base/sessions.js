import Session from "../models/session-model";
import User from "../models/user-model";
import jwtUtils from "../jwt-utils";
var error = require('./response_utils').error;



function* create(next) {
  let email = this.request.body.email;
  let candidatePassword = this.request.body.password;

  const user = new Promise((resolve, reject) => User
    .findOne({ email: email })
    .exec((err, user) =>
    	user ? resolve({ user, match: user.comparePassword(candidatePassword) }) : 
      	reject(err)
    ));
  const userResult = yield user;
  if (!userResult || !userResult.match) {
    return invalid();
  } else {
    try {
      const isValid = yield valid(userResult.user);
      this.status = 200;
      this.response.set("token", isValid.token);
      this.cookies.set("token", isValid.token);
      if (isValid.authyResponse.success && userResult.user.confirmed === true) {
        this.response.set("onetouch", true);
        this.body = {
          message: "Awaiting One Touch approval.",
          trigger: true
        };
      } else {
        this.body = {
          message: "Needs to Verify",
          trigger: false
        };
      }
    } catch (error) {
      throw error;
    }
  }
}

function invalid() {
  // this.status = 403;
  try {
  	error("response", 403, 'Invalid username/password combination.');
  }
  catch(error) {
  	console.trace(error);
  }
}

// respond with a new session for a valid password, and send a 2FA token
function valid(user) {
  return new Promise((resolve, reject) => {
    Session.createSessionForUser(user, false, function(err, session, authyResponse) {
      if (err || !session) {
        return reject("Error creating session - please log in again.");
      } else {
        return resolve({
          token: session.token,
          authyResponse: authyResponse
        });
      }
    });
  })
};


function* destroy(next) {
  this.request.session = null
  this.cookies.set("session", null);
  this.cookies.set("user", null);
  this.cookies.set("authorization", null);
  this.cookies.set("token", null);
  this.status = 200;
  this.body = "Deleted";
};

// Public webhook for Authy to POST to
function* authyCallback() {
  let authyId = this.request.body.authy_id;
  console.log(this.request.body)
  var self = this
  User.findOne({
    authyId: authyId
  }, function(err, user) {
    if (err || !user) return self.status = 400;
    user.authyStatus = self.request.body.status;
    user.save();
  });
  this.body = "Accept";
};

// Internal endpoint for checking the status of OneTouch
function* authyStatus(next) {
  let status = (this.request.user) ? this.request.user.authyStatus : "unverified";
  console.log(this.request.user)
  if (status == "approved") {
    this.request.session.confirmed = true;
    const signedToken = jwtUtils.sign(this.request.user.uuid);
      jwtUtils.store(this, signedToken);
    // this.request.session.save(function(err) {
    //   if (err) return error(this.response, 500,
    //     "There was an error validating your session.");
    // });
  }
  if (!this.request.session) {
    return this.status = 404;
  } else {
    this.response.body = {status};
  }
};

// Validate a 2FA token 
function* verify() {
  let oneTimeCode = this.request.body.code;
  if (!this.request.session || !this.request.user) {
    return error(this.response, 404, "No valid session found for this token.");
  }

  // verify entered authy code
  const user = new Promise((resolve, reject) =>
    User
    .findOne(this.request.user, (err, user) => {
      user.verifyAuthyToken(oneTimeCode, (err, response) => {
        if (err) return reject({ message: "Invalid Token", status: 403 });
        this.request.session.confirmed = true;
        user.confirmed = true;
        user.authyStatus = "approved";
        user.save();
        return resolve({ token: this.request.session.token, status: 200 });
      });
    }));
  const result = yield user.then(res => res).catch(error => error);
  console.log(result, "verify")
  if(result.status === 200) {
  	 const signedToken = jwtUtils.sign(result.user.uuid);
      jwtUtils.store(this, signedToken);
  }
  this.status = result.status
  this.body = result;
};

// Resend validation code
function* resend(next) {
  if (!this.request.user) return error(this.response, 404,
    "No user found for this session, please log in again.");

  // Otherwise resend the code
  this.request.user.sendAuthyToken(function(err) {
    if (!this.request.user) return error(this.response, 500,
      "No user found for this session, please log in again.");

    ok(this.response);
  });
};

export default { resend, verify, create, destroy, authyStatus, authyCallback };
