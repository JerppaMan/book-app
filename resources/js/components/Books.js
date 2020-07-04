import React, { Component } from 'react'
import Axios from 'axios'
import BooksList from "./BooksList";
import BookShow from "./BookShow";

class Books extends Component {
    constructor(props) {
        super(props)

        this.url = 'http://127.0.0.1:8000/api/book-app'
        this.get_books = this.get_books.bind(this)
        this.new_book = this.new_book.bind(this)
        this.set_book = this.set_book.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.deleteHandler = this.deleteHandler.bind(this)
        this.state = {
            books: [],
            id: 0,
            title: '',
            author: '',
            description: '',
        }
    }

    componentDidMount() {
        var state = JSON.parse(localStorage.getItem('book-app'))
        state && this.setState({
            books: state.books,
            id: state.id,
            title: state.title,
            author: state.author,
            description: state.description,
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        localStorage.setItem('book-app', JSON.stringify(nextState))
        return true
    }

    new_book() {
        this.setState({
            id: 0,
            title: '',
            author: '',
            description: '',
        })
    }

    set_book(id) {
        var select_book = this.state.books.reduce((prev, curr) => {
            return curr.id === id ? curr : prev
        }, undefined);

        this.setState({
            id: select_book.id,
            title: select_book.title,
            author: select_book.author,
            description: select_book.description,
        })
    }

    get_books() {
        Axios.get(this.url)
            .then(response => {
                this.setState({books: response.data}, function () {
                    window.location.reload(false);
                })
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    changeHandler(name, value) {
        this.setState({ [name]: value })
    }

    submitHandler(e) {
        e.preventDefault()
        const { id, title, author, description } = this.state
        if (id === 0) {
            Axios.post(this.url, {
                title: title,
                author: author,
                description: description,
            })
                .then(response => {
                    this.new_book()
                    this.get_books()
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        } else if (id > 0) {
            Axios.patch(this.url + '/' + id, {
                title: title,
                author: author,
                description: description,
            })
                .then(response => {
                    this.new_book()
                    this.get_books()
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    deleteHandler(e) {
        e.preventDefault()
        Axios.delete(this.url + '/' + this.state.id)
            .then(response => {
                this.new_book()
                this.get_books()
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { books, id, title, author, description } = this.state
        return (
            <div>
                <div id="listSection">
                    <h2>Books List</h2>
                    <button onClick={this.get_books} className="button">REFRESH</button>
                    <BooksList books={books} book={this.set_book}/>
                </div>
                <div id="editSection">
                    {id === 0 && (
                        <h2>Book New</h2>
                    )}
                    {id > 0 && (
                        <h2>Book Edit</h2>
                    )}
                    <button onClick={this.new_book} className="button_2">NEW</button>
                    <BookShow
                              id={id}
                              title={title}
                              author={author}
                              description={description}
                              submit={this.submitHandler}
                              change={this.changeHandler}
                              delete={this.deleteHandler}
                    />
                </div>
            </div>
        )
    }
}

export default Books
