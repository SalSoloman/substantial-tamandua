var express = require('express');
var router = express.Router();
var database = require('../database')



/* GET home page. */
router.get('/', function(request, response, next) {
 let page = (parseInt(request.query.page))
 if (isNaN(page)) page = 1;
 database.getAllBooks(page)
   .then( books => {
     response.render('homepage', {
       page: page,
       books: books
     })
   }).catch(function(error){
     throw error
   })

});




module.exports = router;
