var path = require('path')
var books= require( path.resolve( __dirname, './books' ) )
const databaseName = 'booksLibrary'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')();
const db = pgp(connectionString);
var title = []
for (var i = 0; i < 40; i++) {
title.push(books.items[i].volumeInfo.title ? books.items[i].volumeInfo.title : null)
title.push(books.items[i].volumeInfo.description ? books.items[i].volumeInfo.description : null)
}
//db.one(`INSERT INTO books VALUES(${title});`)

const ret = (blocks = {id: null,title: null}) => {
  return db.any("SELECT * FROM books WHERE id >1955;")
    .then(results => {
      for (var i = 0; i < results.length; i++) {
      blocks.id = results[i].id
      blocks.title = results[i].title
      console.log(blocks)}
      return blocks
})
.catch(console.log.bind(console))
 }
//ret()

  const inserts = []
  for (var i = 0; i < title.length; i++) {
    var t = title[i]
    var d = title[i+1]
    console.log('Title: ', t)
    console.log('Description: ', d, '\n\n')
    inserts.push( db.none('INSERT INTO books VALUES(DEFAULT, $1, NULL, $2 , NULL);', [t, d]))
  }
    Promise.all(inserts)
    .then(results =>
      console.log(results)
    )
