const Post = require('../models/posts');
// Node module for parsing data, especially file uploads
const formidable = require('formidable');
// File system
const fs = require('fs');

exports.getPosts = (req, res) => {
   
    const post = Post
    .find()
    .select('_id title body')
    .then((posts) => {
        res.json({
            posts: posts
        });
    })
    .catch(err => console.log(err));
}

exports.createPosts = (req, res) => {
    
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "Image could not be uploaded!"
            });
        }
        let post = new Post(fields);
        if(files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });

    const post = new Post(req.body);
    
    post.save((err, result) => {

        post.save()
        .then(result => {
            res.json({
                post: result
            });
        });
    });
    //console.log("Creating post: ", post /*req.body*/);
};