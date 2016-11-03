var mongoose = require('mongoose');
var uuid = require('node-uuid');
var User = require('./user-model');

// Define session model schema
var SessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  confirmed: {
    type: Boolean,
    default: false
  }
});

// Create a session for the given user
SessionSchema.statics.createSessionForUser = function(user, conf, cb) {
  var newSession = new Session({
    userId: user._id,
    confirmed: conf,
    token: uuid.v1()
  });
  if (!conf) {
    user.sendOneTouch(function(err, authyResponse) {
      if (err) return cb.call(newSession, err);
      save(authyResponse);
    });
  } else {
    save();
  }

  // Save the session object
  function save(authyResponse) {
    newSession.save(function(err, doc) {
      cb.call(newSession, err, doc, authyResponse);
    });
  }
};

// Get a user model for this session
SessionSchema.methods.getUser = function(cb) {
  var self = this;
  User.findById(self.userId, cb);
};

// Export user model
var Session = mongoose.model('Session', SessionSchema);
module.exports = Session;
