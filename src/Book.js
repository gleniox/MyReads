import React, { Component } from 'react'

class Book extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentBookShelf: 'none'
        };

        this.getCurrentBookShelf = this.getCurrentBookShelf.bind(this);
    }

    componentWillMount() {
        this.getCurrentBookShelf(this.props.allShelfBooks, this.props.book);
    }

    async getCurrentBookShelf(allShelfBooks, currentBook) {
        let currentBookShelf = allShelfBooks.map((book) => {
            if (book.id === currentBook.id) {
                this.setState({
                    currentBookShelf: book.shelf
                })
            }
        });
    }

    render() {
        const { book, shelve } = this.props
        return (
            <div>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail === null ? 'none' : book.imageLinks.smallThumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select value={this.state.currentBookShelf} onChange={(event) => shelve(book, event.target.value).then()}>
                                <option value="" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </div>
        );
    }
}

export default Book