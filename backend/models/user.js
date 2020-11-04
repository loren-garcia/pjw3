const mongoose = require('mongoose');
const uuidv1 = require('uuidv1');
const crypto = require('crypto'); // provides cryptographic functionality 

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    // long, complicated string
    salt: String,
});

// virtual field -> they don't get persisted in the database (mongoose supports this feature)

userSchema.virtual('password')
.set(function(password) {
    // create a temporary variable (_password)
    this._password = password;
    // generate a timestamp
    this.salt = uuidv1();
    // encrypt the password
    this.hashed_password = this.encryptedPassword(password);
})
.get(function() {
    return this._password
})

// methods (also mongoose supported)
userSchema.methods = {

    authenticate: function(plainText) {
        return this.encryptedPassword(plainText) === this.hashed_password
    },

    encryptedPassword: function(password) {
        if(!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
                        .update(password)
                        .digest('hex');

        } catch(err) {
            return "";
        }
    }
}

module.exports = mongoose.model('User', userSchema);