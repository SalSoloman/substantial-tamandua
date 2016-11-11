var express = require('express');
var router = express.Router();
var database = require('../database');



/* GET home page. */
router.get('/', function(request, response, next) {
  const { type } = request.query
  const { options } = request.query

console.log('type: ', type)
  let page = (parseInt(request.query.page))
  if (isNaN(page)) page = 1;
  if (options === undefined)
  {
  database.getBooks(page)
   .then( books => {
     response.render('homepage', {
       page: page,
       books: books
     })

   }).catch(function(error){
     throw error
   })
  }
    else if (type === 'byTitle') {
       console.log('searching...')
     database.searchTitles(options, page)
     .then( books => {
       console.log(books)
       if(books === undefined) {
         response.send('No books')
       }
       response.render('homepage', {
         page: page,
         books: books
       })
     })
   }


});







module.exports = router;
