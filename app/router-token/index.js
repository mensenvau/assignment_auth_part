const app = require("express")();
const md5 = require("md5");
const { query } = require("../database/db.fun");
const authToken = require("../middleware/auth.token")

app.post("/sign-in", async(req, res) => {
    let h = req.body;
    // validate .... JOI ...... 

    let user = await query("SELECT id,usr,name,savetime FROM users WHERE usr=? and psw=md5(?)", [h.usr, h.psw])

    if (user.err || user.length == 0)
        return res.json({ "message": "No sign", "statusCode": 201, data: h })
    user = user[0]
    let token = md5(user.id + "salom" + h.psw + (new Date()));
    // user.id uchun oldingi token uchrish .....
    await query("DELETE FROM auth_user WHERE users_id=?", [user.id]);
    // yangi token .
    await query("INSERT INTO auth_user (users_id,token) VALUE(?,?)", [user.id, token])

    // return ans
    res.json({ "message": "Ok sign", "statusCode": 200, data: user, token: token })
})


app.get("/info", [authToken], async(req, res) => {
    let usersInfo = await query("SELECT *FROM users WHERE id=?", [req.userID])
    res.json({ "message": "User info", "statusCode": 200, data: usersInfo })
})


module.exports = app