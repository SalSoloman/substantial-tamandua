var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET users listing. */
router.get('/:id', function(request, respond, next) {
  const id = request.params.id
  const { options } = request.query
  //  if (options !== undefined) {
  //    respond.render('homepage', { books: books})
  //  }
  database.getBookDetails(id)
  .then( books => {
  respond.render('bookdetails', {
    books: books
  }
)
})
});

// router.get('/:id*', function(request, respond, next) {
//   console.log('REDIRECT\n\n\n')
//   respond.redirect('..')
//   })
//

module.exports = router;
