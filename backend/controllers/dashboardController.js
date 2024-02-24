
/* GET login page. */
function get(req, res) {
    // test
    console.log("Dashboard in as:", req.session.user)
    const { user } = req.session;
    if (user.role === "user") return res.json({ data: { user } })
    if (user.role === "admin") return res.json({ data: { user: {...user, message: "YAY ADMIN!"}} });

};

module.exports = { get };
