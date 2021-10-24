const express = require('express');
const app = express();
const PORT = require("./config/config.json").APP.PORT || 5050

// import ......
// const fileUpload = require('express-fileupload');
// file yuklash
// app.use(fileUpload());

const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session)

// session
app.use(cookieParser("sevgi nima . zo'r qo'shiq "));
app.use(session({
    secret: "sevgi nima . zo'r qo'shiq ",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({ path: __dirname + './session-store' }),
    cookie: { maxAge: 3600000, secure: false, httpOnly: false }
}))

//ejs engen
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/
app.use(express.json())

//public
app.use(express.static('public'));

// router use
app.use("/", require("./app"))

app.use("*", (req, res) => {
    res.send("Bu hackerlik qilopsiz sudga beraman ")
});

// listin 
app.listen(PORT, () => {
    console.log(`Create server http://localhost:${PORT} .`)
})