const databaseName = 'Bookstore'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')();
const db = pgp(connectionString);

const getBooks = (page, one) => {
  if (one === 1) {
    var offset = 0
    var limit = one
  }
  else {
    var offset = (page - 1) * 10
    var limit = 10
  }
  const sql = `
    SELECT id,
    title, image_url, description
    FROM books LIMIT $1 OFFSET $2
  `
  return db.any(sql, [limit, offset])
     .then(getAuthorsAndGenresForBookIds)
}


const getAuthorsForBookIds = bookIds => {
  const sql = `
    SELECT authors.*, book_authors.book_id
    FROM authors
    JOIN book_authors
    ON book_authors.author_id = authors.id
    WHERE book_authors.book_id IN ($1:csv)
  `
  return db.any(sql, [bookIds])
}

const getGenresForBookIds = bookIds => {
  const sql = `
    SELECT genres.id, genres.name,
    book_genres.book_id
    FROM genres
    JOIN book_genres
    ON book_genres.genre_id = genres.id
    WHERE book_genres.book_id IN ($1:csv)
  `
  return db.any(sql, [bookIds])
}

const getAuthorsAndGenresForBookIds = books => {
  const bookIds = books.map( book => book.id)
  if (bookIds.length === 0) return Promise.resolve(books)
  return Promise.all([
    getAuthorsForBookIds(bookIds),
    getGenresForBookIds(bookIds)
  ])
    .then( results => {
      const authors = results[0]
      const genres = results[1]
      books.forEach( book => {
        book.authors = authors.filter( author => author.book_id === book.id)
        book.genres = genres.filter( genre => genre.book_id === book.id)
      })
      return books
    })
}

const searchTitles = (options, page) => {
  let offset = (page - 1) * 10
  const sql = `
    SELECT * FROM books WHERE
    LOWER(books.title) IN ($1:csv) LIMIT 10
    OFFSET $2
  `
  console.log(options)
  const params = [ '%'+options.replace(/\s+/,'%').toLowerCase()+'%', offset ]
  return db.any(sql, params)
  .then(getAuthorsAndGenresForBookIds)
}

const deleteBookById = bookId => {
  return db.none(`DELETE FROM books WHERE id = $1;
    DELETE FROM book_authors WHERE book_id = $1;
    DELETE FROM book_genres WHERE book_id = $1`, [bookId])
}

const deleteAuthorAssociationByBookIdSql = 'DELETE FROM book_authors WHERE book_authors.book_id = $1 AND book_authors.author_id = $2'

const deleteAuthorAssociationByBookId = (bookId, authorId) => {
  return db.none(deleteAuthorAssociationByBookIdSql, [bookId, authorId])
}

const deleteGenreAssociationByBookIdSql = 'DELETE FROM book_genres WHERE book_genres.book_id = $1 AND book_genres.genre_id = $2'

const deleteGenreAssociationByBookId = (bookId, genreId) => {
  return db.none(deleteGenreAssociationByBookIdSql, [bookId, genreId])
}

module.exports = {getBooks, searchTitles}
