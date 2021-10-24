let authToken = async(req, res, next) => {
    const { query } = require("../database/db.fun");
    // console.log(req.headers.token)
    let token = req.body.token || req.query.token || req.headers.token;
    // where dsavetime datadiff    =  1kun  and now()-savetime<10000
    let user = await query("SELECT *FROM auth_user WHERE token = ? ", [token])
    if (user.err || user.length == 0)
        return res.json({ "message": "auth error", "statusCode": 404 })
    req.userID = user[0].users_id
    console.log("Hi user this id : " + req.userID)
    next();
}

module.exports = authToken