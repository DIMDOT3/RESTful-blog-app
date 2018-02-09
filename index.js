// SETUP

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    // method-override package used to specify PUT/DELETE in html forms
    methodOverride = require('method-override'),
    // sanitizer to remove any potential script tags when rendering html in blog body posts
    expressSanitizer = require('express-sanitizer');

// ==================================
// APP CONFIG
// ==================================

// configure mongoose to connect to DB
mongoose.connect('mongodb://localhost/restful_blog_app');

app.set('view engine', 'ejs');

// configure app to serve custom assets in public folder
app.use(express.static('public'));

// configure app to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

// configure app to use method-override
app.use(methodOverride("_method"));

// configure app to use express-sanitizer - must come after body-parser
app.use(expressSanitizer());

// ==================================
// MONGOOSE/MODEL CONFIG
// ==================================

// Schema setup
var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});

// Model Setup
var Blog = mongoose.model('Blog', blogSchema);

// ==================================
// RESTFUL ROUTES
// ==================================

// Root Route
app.get('/', function(req, res){
   res.redirect('/blogs'); 
});

// Index Route
app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
       if(err){
           console.log(err)
       } else {
           res.render('index', {blogs: blogs})
       }
    });
});

// NEW Route
app.get('/blogs/new', function(req, res){
    res.render('new');
});

// CREATE Route
app.post('/blogs', function(req, res){
    // Create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
       if(err){
           res.render('new');
       } else {
           // then redirect to index
           res.redirect('/blogs');
       }
    });
});

// SHOW Route
app.get('/blogs/:id', function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
       if(err) {
            console.log(err);
            res.direct('/blogs');
       } else {
            res.render('show', {blog: foundBlog});
       }
   });
});

// EDIT Route
app.get('/blogs/:id/edit', function(req, res){
    // find the id first
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('edit', {blog: foundBlog});
        }
    });
});

// UPDATE Route - use method override in HTML form
app.put('/blogs/:id', function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id);    
        }
    });
});

// DESTROY Route - use method override in html form
app.delete('/blogs/:id', function(req, res){
    // destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('server started!') 
});
