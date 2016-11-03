import mongoose from "mongoose";
import config from "../../config/login";
import onetouch from "../base/onetouch";
import CryptoJS from "crypto-js";
// Create authenticated Authy API client
var authy = require("authy")(config.authyApiKey);


const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, index: true },
  password: { type: String, index: true },
  countryCode: { type: String, index: true },
  phoneNumber: { type: String, index: true },
  authyId: { type: Number, index: true },
  email: { type: String, index: true },
  uuid: { type: String },
  confirmed: {type: Boolean, default: false},
  authyStatus: {
    type: String,
    default: "unverified"
  }
});

User.pre("save", function(next) {
  var self = this;

  if (!self.isModified("password")) return next();
  const cipherPassword = CryptoJS.AES.encrypt(self.password, "PBDFK2");
  self.password = cipherPassword;
  next();

  if (!self.authyId) {
    // Register this user if it"s a new user
    authy.register_user(self.email, self.phoneNumber, self.countryCode,
      function(err, response) {
        if (err) {
          console.log(err)
          self.body = err;
          return;
        }
        self.authyId = response.user.id;
        self.save(function(err, doc) {
          if (err || !doc) return next(err);
          self = doc;
        });
      });
  };
});

User.methods.comparePassword = function(candidatePassword) {
  var self = this;
  const bytes = CryptoJS.AES.decrypt(self.password.toString(), "PBDFK2");
  const password = bytes.toString(CryptoJS.enc.Utf8);
  return (password === candidatePassword) ? true : false;
};

// Send a OneTouch request to this user
User.methods.sendOneTouch = function(cb) {
  var self = this;
  self.authyStatus = "unverified";
  self.save();
  console.log("SENDONETOU")
  onetouch.send_approval_request(self.authyId, {
    message: "Request to Login to JadoPado Authy app",
    email: self.email
  }, function(err, authyres) {
  	console.log(err, authyres, "======");
    if (err && err.success != undefined) {
      authyres = err;
      err = null;
    }
    cb.call(self, err, authyres);
  });
};

// Send a 2FA token to this user
User.methods.sendAuthyToken = function(cb) {
  var self = this;

  authy.request_sms(self.authyId, function(err, response) {
  	console.log("SENDSMSAUTHY", err, response);

    cb.call(self, err);
  });
};

// Test a 2FA token
User.methods.verifyAuthyToken = function(otp, cb) {
  var self = this;
  authy.verify(self.authyId, otp, function(err, response) {
  	console.log("VERIFY", err, response);
    cb.call(self, err, response);
  });
};


export default mongoose.model("User", User);
