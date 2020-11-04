/* JSON Web Token
Remote authentication between two parts using a token that authenticates a web request
Most used authentication method in RESTful APIs
 JWT x sessions
The biggest difference is that the user’s state is not stored on the server, as the state is 
stored inside the token on the client side instead. Most of the modern web applications use JWT 
for authentication for reasons including scalability and mobile device authentication.
*/
const jwt = require('jsonwebtoken');

//Express middleware to validate JWTs through the jwt module
const expressJwt = require('express-jwt');

const User = require('../models/user');
require('dotenv').config();

exports.signup = async (req, res) => {
    
    const userExists = await User.findOne({email: req.body.email}) // find the user in db based on email

    if(userExists) return res.status(403).json({ // Email must be unique
        error: "Email is taken"
    })

    const user = await new User(req.body)
    await user.save()
    res.status(200).json({ message: "Success! Please login"}); // user: user is the same as user
};

exports.signin = (req, res) => {
    
    // find the user by email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        // if error or no user
        if(err || !user) {
            return res.status(401).json({
                error: "User does not exists."
            });
        }
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email or password is incorrect."
            }); 
        }
        // generate a token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        // persist the token in the cookie with expire date
        res.cookie('t', token, { expire: new Date() + 9999})
        // return response with user and token to frontend
        const {_id, email} = user;
        return res.json({ token, user: { _id, email }});
    });
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    return res.json({
        message: "Signout sucessfull!"
    });
};

exports.requireSignin = expressJwt({
    // JWT_SECRET is an aleatory key
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth" // auth key to request the object
});