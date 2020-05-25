import React, { Component } from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types';

export default class BookList extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeBookShelf: PropTypes.func.isRequired
    }
    shelves = [
        { type: 'currentlyReading', title: 'Currently Reading' },
        { type: 'wantToRead', title: 'Want to Read' },
        { type: 'read', title: 'Read' }

    ]
    render() {
        const { books, changeBookShelf } = this.props;
        return (
            <div className="list-books-content">
                {this.shelves.map((shelf, index) => {
                    const booksInCurrentShelf = books.filter(book => book.shelf === shelf.type);
                    return (
                        <div className="bookshelf" key={index}>
                            <h2 className="bookshelf-title">{shelf.title}</h2>
                            <div className="bookshelf-books">
                                <BookShelf books={booksInCurrentShelf} changeBookShelf={changeBookShelf} />
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    }
}
