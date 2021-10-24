const app = require("express")();
const { query } = require("../database/db.fun");
const authSession = require("../middleware/auth.session.js")

app.get("/sign-in", (req, res) => {
    return res.render("public/signin", { err: req.query.err || "" })
})

app.post("/sign-in", async(req, res) => {
    let h = req.body;
    // validate .... JOI ...... 
    let user = await query("SELECT id,usr,name,savetime FROM users WHERE usr=? and psw=md5(?)", [h.usr, h.psw])

    if (user.err || user.length == 0)
        return res.redirect("/session/sign-in?err=bunqa users yo'q diyman")
    user = user[0]
    req.session.userID = user.id;
    // return ans
    res.redirect("/session/info")
})


app.get("/info", [authSession], async(req, res) => {
    let usersInfo = await query("SELECT *FROM users WHERE id=?", [req.userID])
    res.render("admin/info", { data: usersInfo[0] })
})


module.exports = app