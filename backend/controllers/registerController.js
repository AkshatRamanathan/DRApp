var registerJSON = require('../templates/register.json');
var User = require('../models/User');


/* GET register page. */
function get(req, res) {
    registerJSON.data.info = req.session.info || null;
    res.json(registerJSON);
};

/* POST register page. */
async function post(req, res) {
    const { username, email, confirm, password } = req.body;
    if (email !== confirm) {
        req.session.info = { type: 'warning', message: "Invalid Details, Please try again" }
        return res.redirect('/register');
    }
    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            req.session.info = { type: 'primary', message: "Account with given username or email already exists" }
            return res.redirect('/register');
        }

        // Create new user
        const newUser = new User({ username, password, email });
        newUser.save();
        req.session.info = { type: 'success', message: "User registered Successfully" }
        return res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        req.session.info = { type: 'danger', message: "Registration unsuccessful. Please try again later" }
        return res.redirect('/register');
    }
};

module.exports = { get, post };
