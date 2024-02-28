var dashboardJSON = require('../templates/dashboard.json');


/* GET dashboard page. */
function get(req, res) {
    const { user } = req.session;
    if (!user) res.status(401).json({ data: {  redirect: "/login" } });
    else {
        dashboardJSON.data.user = user;
        return res.json(dashboardJSON)

    }

};

module.exports = { get };
