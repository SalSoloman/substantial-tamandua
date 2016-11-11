var express = require('express');
var router = express.Router();
var database = require('../database');


/* GET users listing. */
router.get('/:id', function(request, respond, next) {
  const id = request.params.id
  database.getBookDetails(id)
  .then( books => {
  respond.render('bookdetails', {
    books: books
  }
)
})
});

module.exports = router;
