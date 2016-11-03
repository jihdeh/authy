import User from "../models/user-model";
import CryptoJS from "crypto-js";
import Session from "../models/session-model";
const error = require('./response_utils').error;
const ok = require('./response_utils').ok;
import uuid from "node-uuid";


function* registerUser(next) {
  try {
    var p = this.request.body;
    var newUser = new User({
      username: p.username,
      email: p.email,
      phoneNumber: p.phoneNumber,
      countryCode: p.countryCode,
      password: p.password
    });
    newUser.uuid = uuid.v1();
    newUser.save(function(err, doc) {
      if (err) {
        error(response, 500, 'Error saving new user - please try again.');
      } else {
        // Create a pre-authorized session token for the new user
        Session.createSessionForUser(doc, true, function(err, sessionDoc) {
          if (err) {
            error(response, 500, 'Your user was created but we could ' + 'not log you in - please log in again.');
          } else {
            console.log("sessionDoc", sessionDoc)
            this.body = {
              token: sessionDoc.token
            }
          }
        });
      }
    });
  } catch (error) {
    console.log(error, "error log here");
  }
  this.status = 201;
  this.response.body = "Successfully Registered";
}

export default { registerUser }
