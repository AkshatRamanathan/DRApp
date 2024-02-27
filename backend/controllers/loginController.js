var loginJSON = require('../templates/login.json');
var profileJSON = require('../templates/profile.json');
var User = require('../models/User');

/* GET login page. */
function get(req, res,) {
    const { user } = req.session;
    if (user) return res.status(401).json({ data: { redirect: "/dashboard" } })
    loginJSON.data.info = req.session.info || null;
    res.json(loginJSON);
};

/* GET profile page. */
function getProfile(req, res) {
    const { user } = req.session;
    profileJSON.data.user = user;
    for (let item of profileJSON.renderList) {
        if (item.type === 'input') {
            item.name = user[item.name] || item.name;
        }
    }
    res.json(profileJSON);
};

/* GET logout action. */
function logout(req, res) {
    req.session.destroy((err) => {
        res.clearCookie('connect.sid');
        res.redirect('/login')
    });
};

/* POST login page. */
async function post(req, res) {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await User.findOne({ username });
        // If user not found
        if (!user) throw "User does not exist! Please Register"
        // Verify password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) throw "Invalid Credentials, Incorrect Username or Password";
        // Successful login, add to session
        user.password = undefined;
        req.session.user = user;
        return res.redirect('/dashboard')
    } catch (error) {
        req.session.info = { type: 'danger', message: error }
        return res.redirect('/login');
    }
};


module.exports = { get, post, logout, getProfile };
