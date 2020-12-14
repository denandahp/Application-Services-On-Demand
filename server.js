const debug = require('debug')('app:server');
const session = require('cookie-session');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const CONFIG_FILE_PATH = __dirname + '/configs.json';
const config = require(CONFIG_FILE_PATH);
const logger = require('morgan');
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  debug('Server Started. *:%o', PORT);
});

// Views setting
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Body Parser
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//Limit JSON
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

//Static image
app.use(express.static(path.join(__dirname,'uploads')));

//Simple Usage (Enable All CORS Requests)
app.use(cors())
// app.get('/products/:id', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })
// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })

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
const driver = require('./routes/user.js');
const driverSchedule = require('./routes/schedule.js')
const driverAtribut = require('./routes/atribut.js')
const driverComment = require('./routes/comment.js')
const customer = require('./routes/customerUser.js')
const merchantUser = require('./routes/merchantUser.js');
const merchantInfopemilik = require('./routes/merchantInfopemilik.js');
const merchantInfousaha = require('./routes/merchantInfousaha.js');
const warning = require('./routes/warning.js')
const wilayah = require('./routes/wilayah.js')

app.use('/', index);
app.use('/api/driver', driver);
app.use('/api/driver/comment', driverComment);
app.use('/api/driver/schedule', driverSchedule);
app.use('/api/driver/atribut', driverAtribut);
app.use('/api/customer', customer);
app.use('/api/merchant', merchantUser);
app.use('/api/merchant/infopemilik', merchantInfopemilik);
app.use('/api/merchant/infousaha', merchantInfousaha);
app.use('/api/warning', warning);
app.use('/api/wilayah', wilayah);



// Error Middleware
app.use(require('./libs/error.js'));
