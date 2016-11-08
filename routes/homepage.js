var express = require('express');
var router = express.Router();
var book = require('../database')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homepage', { title: 'Express', book : book });
});




module.exports = router;
