import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class BookShelfChanger extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        changeBookShelf: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    }
    options = [
        { value: 'move', title: 'Move to ...', disabled: true },
        { value: 'currentlyReading', title: 'Currently Reading', disabled: false },
        { value: 'wantToRead', title: 'Want to Read', disabled: false },
        { value: 'read', title: 'Read', disabled: false },
        { value: 'none', title: 'None', disabled: false }
    ];
    onChangeHandler = (evt) => {
        const { book, changeBookShelf } = this.props;
        const newShelf = evt.target.value;
        changeBookShelf(book, newShelf);
    }
    render() {
        const { book, books } = this.props;
        let shelf = 'none';
        //not using filter as item might not be here --
        for (let item of books) {
            if (item.id === book.id) {
                shelf = item.shelf;
                break;
            }
        }
        return (
            <div className="book-shelf-changer">
                <select defaultValue={shelf} onChange={this.onChangeHandler}>
                    {this.options.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.disabled}>{option.title}</option>
                    ))}
                </select>
            </div>
        )
    }
}