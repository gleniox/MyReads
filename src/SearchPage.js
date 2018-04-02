import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends Component {
  
    constructor(props) {
    	super(props);
    }
  
    state = {
        query: '',
        results: []
    }

    updateQuery = (query) => {     
        BooksAPI.search(query).then(
          (results) => this.setState({ results: results})).catch(() => this.setState({ results: [] })
        );     
      
        this.setState({ query })
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    render() {
        const { query, shelve } = this.state

        let showingBooks = []       
        showingBooks = this.state.results
        showingBooks.sort(sortBy('title'))      

        return (
            <div>
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((book) => (
                            <li key={book.id}>
                                <Book book={book} shelve={this.props.shelve} allShelfBooks={this.props.allShelfBooks} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchPage