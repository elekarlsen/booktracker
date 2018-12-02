import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import BookShelf from './components/BookShelf'
import Search from './components/Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books : []
  }
  /**
  *Get the books avaliable on the bookshelf using the BookAPI getAll method
  *invoked immediately before the component is inserted into the DOM
  */

  componentWillMount(){
    BooksAPI.getAll().then(books=>{
      this.setState({books});
    });
  }

  /**
  *Update the shelf-selection status, if "none" selected remove that book.
  */

  updateShelfForBook = (selectedBook, newShelf) => {
    this.setState(prevState => {
      let addBook = true;
      prevState.books.forEach(book => {
        if(selectedBook.id === book.id)
          addBook = false;
      });
      if(addBook)
        prevState.books.splice(1, 0, selectedBook);
      return ({
        books: prevState.books
          .map(book => {
            if(book.id === selectedBook.id)
                book.shelf = newShelf;
            return book;
          })
          .filter(b => b.shelf !== "none")
      })
    });
    BooksAPI.update(selectedBook, newShelf);
  }

  render(){
    return (
      <div className="app">
        <Route path = "/search" render={() => (
            <Search
             updateShelfForBook = {this.updateShelfForBook}
             currentBooks ={this.state.books}
            />
        )}/>
        <Route exact path = "/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  title="Currently Reading"
                  selectedBooks={this.state.books.filter(book => book.shelf === "currentlyReading")}
                  updateShelfForBook={this.updateShelfForBook}
                />
                <BookShelf
                  title="Want to Read"
                  selectedBooks={this.state.books.filter(book => book.shelf === "wantToRead")}
                  updateShelfForBook={this.updateShelfForBook}
                />
                <BookShelf
                  title="Read"
                  selectedBooks={this.state.books.filter(book => book.shelf === "read")}
                  updateShelfForBook={this.updateShelfForBook}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp;