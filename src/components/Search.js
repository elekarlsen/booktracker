import { Link } from "react-router-dom"
import React, { Component } from "react";
import PropTypes from "prop-types";
import  sortBy from "sort-by";
import Book from "./Book";
import * as BooksAPI from "../utils/BooksAPI";

/**
*Component "Search" using ES6 class component
*App->Search
*/

class Search extends Component {
  	static propTypes = {
		currentBooks: PropTypes.array.isRequired,
		updateShelfForBook: PropTypes.func.isRequired
  	}

	state = {
		searchResults: [],
		query: "",
		invalidQuery: false
	}

	handleQueryEvent = (query)=>{
		this.setState({invalidQuery:false})
		this.setState({query:query})
		this.search(query);
	}

	/**
	*Search function that takes a query and updates the
	*booksearch results array state with recieved books.
	*Search results are not shown when ALL of the text is deleted from input box
	*Invalid queries are handled and prior search results are not shown
	*Search works correctly when there is no thumbnail or author
	*User able to search multiple words
	*User receives error instructions to try again if query book not in "search terms"
	*/

	search = (query) =>{
		setTimeout(() => {
			(query === this.state.query && query.length > 0 && this.state.searchResults.length === 0)
				? this.setState({invalidQuery:true}):this.setState({invalidQuery:false});
		}, 1000);
		this.setState({searchResults:[]})
		if(query.length !== 0) {
			let individualQuery = query.split(" ");
			individualQuery.push(query);
			let that = this;
			let resultsSummary = [];
			individualQuery.forEach(thisQuery=> {
				thisQuery = thisQuery.trim();
				if(thisQuery.length !== 0 && thisQuery.indexOf(" ") !== 0  ) {
					BooksAPI.search(thisQuery).then(results => {
						if(!results.error && query === this.state.query) {
							let modifiedResults = results.map(bookResult => {
								bookResult.shelf = "undefined"
								if(!bookResult.imageLinks) bookResult.imageLinks = "undefined";
								let inBookShelf = that.props.currentBooks.some(bookInShelf => bookInShelf.id === bookResult.id);
								bookResult.shelf =
									inBookShelf ? that.props.currentBooks.find(bookInShelf=>bookInShelf.id === bookResult.id).shelf : "none";
								return bookResult;
							});
							that.state.searchResults.forEach(book => {
								modifiedResults = modifiedResults.filter(b => b.id !== book.id);
							});
							Array.prototype.push.apply(resultsSummary, modifiedResults);
							that.setState ({searchResults: resultsSummary});
						}
					})
				}
			});
		}
	}

  	render() {
  		let sortedResults = this.state.searchResults;
  		sortedResults.sort(sortBy("title"))
	    return (
		 	<div className="search-books">
	 	        <div className="search-books-bar">
	 	            <Link className="close-search" to ="/"></Link>
	 	            <div className="search-books-input-wrapper">
		                <form>
	 	            		<input
	 	            			type="text"
	 	            			placeholder="Search by title or author"
	 	            			onChange = {event => this.handleQueryEvent(event.target.value)}
	 	            			value = {this.state.query}
	 	            		/>
	 	            	</form>
		            </div>
		        </div>
		    	<div className="search-books-results">
		    		{this.state.invalidQuery && (
						<div className="querry-error">					
							<h3>Please try again!</h3>
							<h4>Search is limited to the following search terms: </h4>
							<p>'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'</p>
						</div>
					)}
		            <ol className="books-grid">
		             	{sortedResults.map(book => (
		                	<Book
		             	    	book={book}
								key={book.id}
								updateShelfForBook ={ this.props.updateShelfForBook }  
		                 	/>
		            	))}
		            </ol>
	 	  		</div>
	 	    </div>
	    )
	}
}

export default Search;
