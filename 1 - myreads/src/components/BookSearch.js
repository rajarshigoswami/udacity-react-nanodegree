import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types';

export default class BookSearch extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeBookShelf: PropTypes.func.isRequired
    }
    state = {
        searchedBooks: [],
        query: '',
        error: ''
    }
    search = (evt) => {
        const query = evt.target.value;
        this.setState(currState => ({
            query
        }))
        if (query.length <= 3) {
            this.setState(currState => ({
                searchedBooks: [],
                error: false
            }))
        } else {
            BooksAPI.search(query).then(response => {
                if (response.error) {
                    //Error Fetching Results
                    this.setState(currState => ({
                        searchedBooks: [],
                        error: true
                    }))
                } else {
                    this.setState(currState => ({
                        searchedBooks: response,
                        error: false
                    }))
                }
            })
        }
    }
    render() {
        const { searchedBooks, error, query } = this.state;
        const { books, changeBookShelf } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author. Will start searching automatically after 3 letters. " value={this.state.query} onChange={this.search} />
                    </div >
                </div>
                {(searchedBooks.length > 0) && (<div className="search-books-results">
                    <h2>Your Search for "{query}" returned {searchedBooks.length} books </h2>
                    <ol className="books-grid">
                        {searchedBooks.map(b => (
                            <Book book={b} books={books} changeBookShelf={changeBookShelf} key={b.id} />
                        ))}
                    </ol>
                </div>)}
                {error && (<div className="search-books-results"><h2>Your Search for "{query}" didnot return any books</h2></div>)}
            </div >
        )
    }
}
