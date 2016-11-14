var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET users listing. */
router.get('/:id', function(request, respond, next) {
  const id = request.params.id
  const { options } = request.query
  console.log('Query:  ', request.params)
  if (options !== undefined) {
    console.log('Search yo')
    respond.redirect('..')
    respond.end()
  }
  database.getBookDetails(id)
  .then( books => {
  respond.render('bookdetails', {
    books: books
  }
)
})
});

router.get('/:id*', function(request, respond, next) {
  console.log('REDIRECT\n\n\n')
  respond.redirect('..')
  })


module.exports = router;
