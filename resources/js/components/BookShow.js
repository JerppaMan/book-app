import React, { Component } from 'react'

class BookShow extends Component {
    changeHandler(event) {
        this.props.change(event.target.name, event.target.value)
    }

    submitHandler(e) {
        this.props.submit(e)
    }

    deleteHandler(e) {
        this.props.delete(e)
    }

    render() {
        const { id, title, author, description } = this.props
        return (
            <div className="form-group">
                <form onSubmit={this.submitHandler.bind(this)}>
                    <div className="input-group">
                        <p>Title</p>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.changeHandler.bind(this)}
                            className="form-text"
                        />
                    </div>
                    <div className="input-group">
                        <p>Author</p>
                        <input
                            type="text"
                            name="author"
                            value={author}
                            onChange={this.changeHandler.bind(this)}
                            className="form-text"
                        />
                    </div>
                    <div className="input-group">
                        <p>Description</p>
                        <textarea
                            name="description"
                            value={description}
                            onChange={this.changeHandler.bind(this)}
                            className="form-text-description"
                        />
                    </div>
                    <button type="submit" id="submit">SUBMIT</button>
                </form>
                {id > 0 && (
                    <form onSubmit={this.deleteHandler.bind(this)}>
                        <button type="submit" id="delete">DELETE ID:{id}</button>
                    </form>
                )}
            </div>
        )
    }
}

export default BookShow
