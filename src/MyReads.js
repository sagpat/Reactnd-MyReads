import React from 'react'
import './App.css'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

const MyReads = (props) => {

  const { books, onAdjustBookShelf } = props
  const shelveWithTitle = [['currentlyReading', 'Currently Reading'],
                          ['wantToRead', 'Want To Read'],
                          ['read', 'Read']]

      return (
      <div className="list-books">
         <div className="list-books-title">
           <h1>MyReads</h1>
         </div>

        <div className="list-books-content">
           <div>
             {shelveWithTitle.map((eachBook) =>{
                const [shelf, title] = eachBook
                return <div key={shelf} className="bookshelf">
                          <h2 className="bookshelf-title">{title}</h2>
                          <div className="bookshelf-books">
                            <ol className="books-grid">
                              {books.filter((book) => book.shelf === shelf).map((book) => (
                                  <li key={book.id}>
                                    <Book book={book} onAdjustBookShelf={onAdjustBookShelf} />
                                  </li>
                              ))}
                            </ol>
                          </div>
                       </div>
                     })}
            </div>
          </div>
            <div className="open-search">
              <Link to="/search"> Add a Book </Link>
            </div>
        </div>
        )
}

MyReads.propTypes={
  books: PropTypes.array.isRequired,
  onAdjustBookShelf: PropTypes.func.isRequired

}

export default MyReads
