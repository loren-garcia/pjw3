const express = require("express");
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// Middleware to validate fields
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
// routes
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');

const cors = require('cors');

dotenv.config();

mongoose
.connect(
    process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
.then(() => {
    console.log('DB connected!')
});

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

// Middleware to show what kind of requests are arriving from the server
const morgan = require("morgan");
app.use(morgan("dev"));

/* Concept of how middleware works
const myOwnMiddleware = (req, res, next) => {
    console.log("Middleware applied!");
    next();
}
app.use(myOwnMiddleware);*/
app.use(cors()); // PUT ON TOP OF OTHER MIDDLEWARES!!! IF NOT, WON'T WORK!!!
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

app.use('/', postRoutes);
app.use('/', authRoutes);
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});*/
app.use(function (err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
        res.status(401).json({ 
            error: 'Unauthorized!'
        });
    }
});

/*const postRoutes = require('./routes/posts');

app.get('/', postRoutes.getPosts);

//object destructor
const { getPosts } = require('./routes/posts');*/

/*const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/api', createProxyMiddleware({ 

    target:'http://localhost:8080', //original url

    changeOrigin:true, 

    //secure: false,

    onProxyRes:function (proxyRes, req, res) {

      proxyRes.headers['Access-Control-Allow-Origin'] = '*';

    }

}));*/

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});

