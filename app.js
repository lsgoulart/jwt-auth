var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var cors            = require('cors');
var jwt             = require('jsonwebtoken');
var expressJwt      = require('express-jwt');

var SECRET = 'cXVhc2VuYWRhZXJhb25vbWVkb3BsYXllcg==';
process.env.JWT_SECRET = SECRET;

var api     = {};
var routes  = require('./routes/index');
var auth    = require('./routes/auth');
api.videos  = require('./routes/videos');

var local = {
    db: 'mongodb://localhost:27017/jwt-auth',
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use('/api', expressJwt({
    secret: SECRET,
    getToken: function fromHeaderOrQuerystring (req) {
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
        if(token) return token;
        else return null;
    }
}));


// MongoDB Connection
mongoose.connect(local.db, function(err){
    if(err) console.log('connection error', err);
    else console.log('connection successful');
});


// Routes

// Authentication
app.use('/auth', auth);

// Api
app.use('/api/videos', api.videos);

// Front-end
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
