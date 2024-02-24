var loginJSON = require('../templates/login.json');
var User = require('../models/User');



/* GET login page. */
function get(req, res,) {
    loginJSON.data.info = req.session.info || null;
    res.json(loginJSON);
};

/* POST login page. */
async function post(req, res) {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await User.findOne({ username });
        // If user not found
        if (!user) throw "User does not exist!"
        // Verify password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) throw "Invalid Credentials, Incorrect Username or Password";
        // Successful login, add to session
        user.password = undefined;
        req.session.user = user;
        console.log("logged in as:", user)
        return res.redirect('/dashboard')
    } catch (error) {
        console.error('Error logging in user:', error);
        req.session.info = { type: 'danger', message: error }
        return res.redirect('/login');
    }
};


module.exports = { get, post };
