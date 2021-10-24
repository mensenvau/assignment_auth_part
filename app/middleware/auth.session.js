let authSession = (req, res, next) => {
    if (!req.session.userID)
        return res.redirect("/session/sign-in?err=Auth error")

    req.userID = req.session.userID;
    console.log("Hi user this id : " + req.userID)
    next();
}

module.exports = authSession