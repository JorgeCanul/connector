const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const keys = require('./config/keys');
const postRouter = require('./routes/posts');
const registerRouter = require('./routes/users');
const profileRouter = require('./routes/profile');
const cors = require('cors');
const app = express();

//Body parser config
// app.use(express.urlencoded());
// app.use(express.json());

// image request
// app.use(express.json({limit: "30mb", extended: true}));
// app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
// console.log('Limit file size: '+limit);
app.use(express.urlencoded());
app.use(express.json());

app.use(cors());

//Db  conf.
const db = keys.mongoURI;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Data base connected'))
.catch((err) => console.log(err));

//Passport conf.
// Make sure to initialize passport before routes
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes config
app.use('/api/posts', postRouter);
app.use('/api/users', registerRouter);
app.use('/api/profile', profileRouter);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App running on port ${PORT}`));







