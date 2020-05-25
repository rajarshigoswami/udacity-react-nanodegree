import React, { Component } from 'react'
import BookShelfChanger from './BookShelfChanger'
import PropTypes from 'prop-types';

export default class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        books: PropTypes.array.isRequired,
        changeBookShelf: PropTypes.func.isRequired
    }
    render() {
        const { book, books, changeBookShelf } = this.props;
        const coverImg = book.imageLinks.thumbnail;
        const title = book.title;
        const authors = (book.authors && book.authors.length) > 0 ? book.authors.join(' & ') : 'Unknown';
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{ backgroundImage: `url(${coverImg})`, height: '188px', width: '128px' }}
                        />
                        <BookShelfChanger book={book} books={books} changeBookShelf={changeBookShelf} />
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">
                        {authors}
                    </div>
                </div>
            </li>
        )
    }
}
