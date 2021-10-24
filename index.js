const express = require('express');
const app = express();
const PORT = require("./config/config.json").APP.PORT || 5050

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/
app.use(express.json())

//public
app.use(express.static('public'));

// router use
app.use("/", require("./app"))


// listin 
app.listen(PORT, () => {
    console.log(`Create server http://localhost:${PORT} .... click url`)
})