const debug = require('debug')('app:server');
const session = require('cookie-session');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const CONFIG_FILE_PATH = __dirname + '/configs.json';
const config = require(CONFIG_FILE_PATH);
const logger = require('morgan');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  debug('Server Started. *:%o', PORT);
});

// Views setting
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Body Parser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookie-session
app.set('trust proxy', 1); // trust first proxy

app.use(session(config.cookies));

// MaxAge
app.use(function SessionMaxAgeMiddleware (req, res, next) {
  req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge;
  next();
});

// locals.
app.use(function LocalsMiddleware (req, res, next) {

  res.locals.edit = false;
  res.locals.user = req.session.user || false;

  next();
});

const index = require('./routes/index.js');
const user = require('./routes/user.js');
const schedule = require('./routes/schedule.js')
const warning = require('./routes/warning.js')
const comment = require('./routes/comment.js')
const wilayah = require('./routes/wilayah.js')


app.use('/', index);
app.use('/user', user);
app.use('/user/comment', comment);
app.use('/schedule', schedule);
app.use('/warning', warning);
app.use('/wilayah', wilayah);


// Error Middleware
app.use(require('./libs/error.js'));
