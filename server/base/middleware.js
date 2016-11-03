var User = require('../models/user-model');
var Session = require('../models/session-model');
var config = require('../../config/login');
var crypto = require('crypto');
var Qs = require('qs');

// Extract user model information for every request based on an auth token
function* loadUser(next) {
  var self = this;
  var token = this.cookies.get("token") || this.request.query["X-API-TOKEN"];
  if (!token) return yield next;

  const session = yield Session.findOne({ token: token }).lean().exec();
  this.request.session = session;
  this.cookies.set("session", JSON.stringify(session));
  if (session) {
    const user = yield User.findById(session.userId).select("username email authyStatus authyId").lean().exec();
    if (user) {
      this.request.user = user
      this.cookies.set("user", JSON.stringify(user));
    } else { yield next; }
  };
  yield next;
};

// Authentication middleware
function* loginRequired(next) {
  const session = this.cookies.get("session");
  this.request.session = JSON.parse(session);
  if (!this.request.session || !!this.request.session.confirmed) {
    this.status = 403;
    this.body = "Your session has expired - please log in again.";
    console.log("here")
  } else {
    yield next;
  }
};

function sortObject(object) {
  var sortedObj = {};
  var keys = Object.keys(object).sort();

  for (var index in keys) {
    var key = keys[index];
    if (typeof object[key] == 'object' && !(object[key] instanceof Array) && object[key] != null) {
      sortedObj[key] = sortObject(object[key]);
    } else {
      sortedObj[key] = object[key];
    }
  }
  return sortedObj;
}

// Authenticate Authy request
function* validateSignature(next) {
  var key = config.authyApiKey;
  var url = this.request.protocol + '://' + this.get('host') + this.request.originalUrl;
  var params = Qs.stringify(sortObject(this.request.body));
  params = params.replace(/%20/g, "+");
  var nonce = this.get("X-Authy-Signature-Nonce");

  // format of Authy digest
  var message = nonce + "|" + this.request.method + "|" + url + "|" + params;

  var theirs = (this.get("X-Authy-Signature")).trim();
  var mine = crypto.createHmac('sha256', key).update(message).digest('base64');
  if (theirs != mine) {
    this.response = {
      status: 401,
      body: "This request is unsigned."
    }
  } else {
    yield next;
  }
};

export default { validateSignature, loginRequired, loadUser }
