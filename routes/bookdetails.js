var express = require('express');
var router = express.Router();
var database = require('../database');


/* GET users listing. */
router.get('/', function(request, respond, next) {
  database.getBooks(777, 1)
  .then( books =>
  respond.render('bookdetails', {
    books: books
  })
)
});

module.exports = router;
