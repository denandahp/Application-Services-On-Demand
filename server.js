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

var admin = require("firebase-admin");
var serviceAccount = require('./private_key_firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

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
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000
}));

//Static image
app.use(express.static(path.join(__dirname, 'uploads')));

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
app.use(function SessionMaxAgeMiddleware(req, res, next) {
  req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge;
  next();
});

// locals.
app.use(function LocalsMiddleware(req, res, next) {

  res.locals.edit = false;
  res.locals.user = req.session.user || false;

  next();
});

const index = require('./routes/index.js');
const driverUser = require('./routes/user.js');
const driverSchedule = require('./routes/schedule.js');
const driverAtribut = require('./routes/atribut.js');
const driverComment = require('./routes/comment.js');
const driverListOrder = require('./routes/driverListOrder.js');
const driverNotiffood = require('./routes/driverNotiffood.js');
const driverPayment = require('./routes/driverPayment.js')
const customerUser = require('./routes/customerUser.js');
const customerFilterfood = require('./routes/customerFilterfood.js');
const customerMenujfood = require('./routes/customerMenujfood.js');
const customerNotiffood = require('./routes/customerNotiffood.js');
const customerPayment = require('./routes/customerPayment.js');
const customerListOrder = require('./routes/customerListOrder.js');
const customerReview = require('./routes/customerReview.js');
const merchantUser = require('./routes/merchantUser.js');
const merchantInfopemilik = require('./routes/merchantInfopemilik.js');
const merchantInfousaha = require('./routes/merchantInfousaha.js');
const merchantJambuka = require('./routes/merchantJambuka.js');
const merchantInfoproduk = require('./routes/merchantInfoproduk.js');
const merchantInforestoran = require('./routes/merchantInforestoran.js');
const merchantNotiffood = require('./routes/merchantNotiffood.js');
const merchantOrder = require('./routes/merchantOrder.js');
const merchantListOrder = require('./routes/merchantListOrder.js');
const warning = require('./routes/warning.js');
const wilayah = require('./routes/wilayah.js');
const uploadImage = require('./routes/uploadImage.js');
const dashboardPrice = require('./routes/dashboardPrice.js');


app.use('/', index);
app.use('/api/driver', driverUser);
app.use('/api/driver', driverNotiffood);
app.use('/api/driver/comment', driverComment);
app.use('/api/driver/schedule', driverSchedule);
app.use('/api/driver/atribut', driverAtribut);
app.use('/api/dashboard', driverListOrder);
app.use('/api/driver/payment', driverPayment);
app.use('/api/customer', customerUser);
app.use('/api/customer', customerFilterfood);
app.use('/api/customer', customerMenujfood);
app.use('/api/customer', customerNotiffood);
app.use('/api/customer', customerPayment);
app.use('/api/customer/review', customerReview);
app.use('/api/customer/dashboard', customerListOrder);
app.use('/api/merchant', merchantUser);
app.use('/api/merchant', merchantNotiffood);
app.use('/api/merchant/infopemilik', merchantInfopemilik);
app.use('/api/merchant/infousaha', merchantInfousaha);
app.use('/api/merchant/jambuka', merchantJambuka);
app.use('/api/merchant/infoproduk', merchantInfoproduk);
app.use('/api/merchant/inforestoran', merchantInforestoran);
app.use('/api/merchant/order', merchantOrder);
app.use('/api/merchant/dashboard', merchantListOrder);
app.use('/api/warning', warning);
app.use('/api/wilayah', wilayah);
app.use('/api/uploadImage', uploadImage);
app.use('/api/dashboard/price', dashboardPrice);

// Error Middleware
app.use(require('./libs/error.js'));