import {
  PORT, NODE_ENV, MONGO_URI, SESS_NAME, SESS_SECRET, SESS_LIFETIME
} from "./config/config";
const express = require("express");
const session = require("express-session");
const connectStore = require("connect-mongo")
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const usersRoutes = require("./routes/userRouter");
const ordersRoutes = require("./routes/orderRouter");
const cartRoutes = require("./routes/cartRouter")
const menuRoutes = require("./routes/menuRouter");
const sessionRoutes = require("./routes/sessionRouter")
const path = require('path');


const MongoStore = connectStore(session);

mongoose.connect(MONGO_URI, { useNewUrlParser: true });
const connection = mongoose.connection;
    app.set('port', process.env.PORT || PORT)
    app.use('/images', express.static('Images'))
    app.use(express.static('../build'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(passport.initialize());
    require("./config/passport")(passport)
    app.use(session({
      name: SESS_NAME,
      secret: SESS_SECRET,
      saveUninitialized: false,
      resave: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'session',
        ttl: parseInt(SESS_LIFETIME) / 1000
      }),
      cookie: {
        sameSite: true,
        secure: NODE_ENV === 'production',
        maxAge: parseInt(SESS_LIFETIME)
      }
    }));
// Routes
app.use("/users", usersRoutes)
app.use("/menu", menuRoutes)
app.use("/orders", ordersRoutes)
app.use("/session", sessionRoutes)
app.use("/cart", cartRoutes)
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "build",     
//   "index.html"));
// });
app.use('/static', express.static('images'))
app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});
app.listen(app.get('port'), function () {
    console.log("Server is running on Port: " + PORT);
  });

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
