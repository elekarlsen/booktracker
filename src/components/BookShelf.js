import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

/**
*Using a stateless functional component. Parent components manage the state of each shelf
*udpdateShelfForBook methods passed down from App
*/

const BookShelf = ({ selectedBooks, title, updateShelfForBook }) => {
	return (
    	<div className="bookshelf">
            <h2 className="bookshelf-title">
                { title }
            </h2>
            <div className="bookshelf-books">
            	<ol className="books-grid">
                    {selectedBooks.map(book => (
                        <Book
                            key={book.id}
                            book={book}
                            updateShelfForBook = { updateShelfForBook }
                        />
                     ))}
                </ol>
            </div>
        </div>
	)
}

BookShelf.propTypes = {
  selectedBooks: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  updateShelfForBook: PropTypes.func.isRequired
}

export default BookShelf;

