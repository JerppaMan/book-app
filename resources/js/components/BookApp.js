import React from 'react';
import ReactDOM from 'react-dom';
import Books from "./Books";
import "./appStyles.css";

function BookApp() {
    return (
        <div>
            <div className="BookApp">
                <h1>Book App</h1>
                <Books />
            </div>
        </div>
    );
}

export default BookApp;

if (document.getElementById('root')) {
    ReactDOM.render(<BookApp />, document.getElementById('root'));
}
