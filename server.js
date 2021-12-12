const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const keys = require('./config/keys');
const postRoutes = require('./routes/posts');
const registerRouter = require('./routes/profile');
const cors = require('cors');
const app = express();

//Body parser config
app.use(express.urlencoded());
app.use(express.json());

// image request
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));

app.use(cors());

//Db  conf.
const db = keys.mongoURI;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Data base connected'))
.catch(() => console.log('Data base error'));



// Routes config
app.use('/api/posts', postRoutes);
app.use('/api/user', registerRouter);

//Passport conf.
app.use(passport.initialize());
require('./config/passport')(passport);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App running on port ${PORT}`));







