var dashboardJSON = require('../templates/dashboard.json');

const ADMIN_OPTIONS = {
    "id": "4",
    "name": "Users",
    "type": "nav",
    "href": "/dashboard/users"
};

/* GET dashboard page. */
function get(req, res) {
    const { user } = req.session;
    if (!user) res.status(401).json({ data: { redirect: "/login" } });
    let pageJson = JSON.parse(JSON.stringify(dashboardJSON));
    if (user.role === "admin") {
        pageJson.renderList.push(ADMIN_OPTIONS)
    }
    pageJson.data.user = user;
    return res.json(pageJson)
};

module.exports = { get };
