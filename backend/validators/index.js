exports.createPostsValidator = (req, res, next) => {
    
    // title
    req.check('title', 'Write a title').notEmpty();
    req.check('title', 'Title must be between 4 to 150 characters')
    .isLength({
        min: 4,
        max: 150
    });
    // body
    req.check('body', 'Write a body').notEmpty();
    req.check('body', 'Title must be between 4 to 2000 characters')
    .isLength({
        min: 4,
        max: 2000
    });
    // check for errors
    const errors = req.validationErrors();

    if(errors) {
        const fistError = error.map((error) => error.msg)[0]
        return res.status(400).json({error: fistError})
    }
    // go to next middleware
    next();

};

exports.userSignupValidator = (req, res, next) => {

    // Email can't be empty or less than 3
    req.check("email", "Email cannot be empty").notEmpty();
    req.check("email", "Email cannot be less than 3") 
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({ min: 3 });

    req.check("password", "Password cannot be empty").notEmpty();
    req.check("password")
    .isLength({ min: 4 })
    .withMessage("Password cannot be less than 3");
    //.matches(/\d/) this requires at least one number

    const errors = req.validationErrors();

    if(errors) {
        const fistError = error.map((error) => error.msg)[0]
        return res.status(400).json({error: fistError})
    }

    next();
};