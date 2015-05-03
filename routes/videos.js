var express = require('express');
var router = express.Router();

/* GET videos page. */
router.get('/', function(req, res) {
	res.json({
		type: true,
		data: 'success'
	});
});

module.exports = router;
