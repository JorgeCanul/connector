const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const postRoutes = require('./routes/posts');
const registerRouter = require('./routes/profile');
const cors = require('cors');
const app = express();

//Body parser config
app.use(express.urlencoded());
app.use(express.json());

// image request
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors());

//Db  conf.
const db = keys.mongoURI;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Data base connected'))
.catch(() => console.log('Data base error'));

//Passport conf.
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes config
app.use('/api/posts', postRoutes);
app.use('/api/register', registerRouter);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App running on port ${PORT}`));







