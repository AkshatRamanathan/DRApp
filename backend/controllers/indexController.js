var indexJSON = require('../templates/index.json');

/* GET index page. */
function get(_, res) {
    res.json(indexJSON);
}

module.exports = { get };
