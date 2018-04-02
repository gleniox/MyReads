import React from 'react'
import { Link, Route } from 'react-router-dom'
import './App.css'
import SearchPage from './SearchPage'
import Shelf from './Shelf'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
    allShelfBooks: []
  }

  shelve = (book, shelf) => {
    if (book !== null && shelf !== '') {
      BooksAPI.update(book, shelf).then(() => {
        this.getAllBooks();
      })
    }
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
     BooksAPI.getAll().then((allShelfBooks) => {
      this.setState({
        currentlyReadingBooks: allShelfBooks.filter((b) => b.shelf === 'currentlyReading'),
        wantToReadBooks: allShelfBooks.filter((b) => b.shelf === 'wantToRead'),
        readBooks: allShelfBooks.filter((b) => b.shelf === 'read'),
        allShelfBooks: allShelfBooks
      })
    })
  }

  render() {
    return (
      <div className="app">

        <div className="search-books">
          <Route path='/search' render={({ history }) => (
            <SearchPage allShelfBooks={this.state.allShelfBooks} shelve={this.shelve}/>
          )} />
        </div>

        <div className="list-books">
          <Route exact path='/' render={() => (
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
          )} />
          <div className="list-books-content">
            <div>
              <Route exact path='/' render={() => (
                <Shelf shelfBookName='Currently Reading' allShelfBooks={this.state.allShelfBooks} shelfBooks={this.state.currentlyReadingBooks} shelve={this.shelve}/>
              )} />
              <Route exact path='/' render={() => (
                <Shelf shelfBookName='Want To Read' allShelfBooks={this.state.allShelfBooks} shelfBooks={this.state.wantToReadBooks} shelve={this.shelve}/>
              )} />
              <Route exact path='/' render={() => (
                <Shelf shelfBookName='Read' allShelfBooks={this.state.allShelfBooks} shelfBooks={this.state.readBooks} shelve={this.shelve}/>
              )} />
            </div>
          </div>
          <div className="open-search">
            <Route exact path='/' render={() => (
              <Link to='/search'>Add a book</Link>
            )} />
          </div>
        </div>

      </div>
    )
  }
}

export default BooksApp