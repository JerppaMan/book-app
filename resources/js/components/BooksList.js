import React, { Component } from 'react'

export class BooksList extends Component {
    render() {
        return (
            <div>
                <div>
                    {
                        this.props.books.map(book =>
                            <div className="list-div" key={book.id}>
                                <button className="list-button" onClick={() => {
                                    this.props.book(book.id);
                                }} key={book.id}><div className="list-item">
                                    <p className="title">{book.title}</p>
                                    <p className="author">Author: {book.author}</p>
                                </div></button>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default BooksList
