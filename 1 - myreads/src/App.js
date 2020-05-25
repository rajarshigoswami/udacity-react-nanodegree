import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import BookList from './components/BookList'
import BookSearch from './components/BookSearch'

class BooksApp extends React.Component {
    state = {
        books: []
    }
    componentDidMount() {
        BooksAPI.getAll().then(books => this.setState({ books }));
    }

    changeBookShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(response => {
            book.shelf = shelf;
            //see if the book is in the list, if yes, update the shelf
            this.setState(currState => ({
                books: currState.books.filter(b => b.id !== book.id).concat(book)
            }))
        })
    }

    render() {
        const { books } = this.state;
        return (
            <div className="app">
                <Route
                    path="/search"
                    render={() => (
                        <BookSearch books={books} changeBookShelf={this.changeBookShelf} />
                    )}
                />
                <Route
                    exact
                    path="/"
                    render={() => (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            <BookList books={this.state.books} changeBookShelf={this.changeBookShelf} />
                            <div className="open-search">
                                <Link to="/search">Search</Link>
                            </div>
                        </div>
                    )}
                />
            </div>
        );
    }
}

export default BooksApp
