import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component {
  
    constructor(props) {
    	super(props);
    }
  
    render() {
        const { shelfBookName, shelfBooks, shelve } = this.props
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{shelfBookName}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {shelfBooks.map((book) => (
                                <li key={book.id}>
                                    <Book book={book} allShelfBooks={this.props.allShelfBooks} shelve={this.props.shelve}/>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default Shelf