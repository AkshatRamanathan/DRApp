
/* GET dashboard page. */
function get(req, res) {
    const { user } = req.session;
    if (!user) res.status(401).json({ data: {  redirect: "/login" } });
    else {
        if (user.role === "user") return res.json({ data: { user } })
        if (user.role === "admin") return res.json({ data: { user: { ...user, message: "YAY ADMIN!" } } });

    }

};

module.exports = { get };
