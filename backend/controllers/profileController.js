const User = require('../models/User');
var profileJSON = require('../templates/profile.json');

/* GET profile page. */
function get(req, res) {
    const { user } = req.session;
    if (!user) res.status(401).json({ data: { redirect: "/login" } });
    profileJSON.data.user = user;
    for (let item of profileJSON.renderList) {
        if (item.type === 'input') {
            item.name = user[item.name] || item.name;
        }
    }
    profileJSON.data.info = req.session.info || null;
    res.json(profileJSON);
};

/* POST profile page. */
async function post(req, res) {
    console.log(req.body);
    const { email, confirm, password } = req.body;
    if (!confirm || !password || password !== confirm) {
        req.session.info = { type: 'warning', message: "Invalid Details, Please try again" }
        return res.redirect('/profile');
    }
    const { username } = req.session.user;
    const existingUser = await User.findOne({ username });
    existingUser.password = password;
    existingUser.save();
    req.session.info = null //cleanup
    return res.redirect("/dashboard")
};

module.exports = { get, post };
