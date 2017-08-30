import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'


class SearchBooks extends React.Component{

    state = {
      foundBooks: []
    }

    clearBookState = () =>{
      this.setState({ foundBooks:[] })
    }

    searchBooks =(query) =>{
      if(query.length === 0){
        this.clearBookState()
        }
        else {
          BooksAPI.search(query).then((foundBooks) => {
            if(foundBooks.error){
              this.clearBookState()
            }
            else {
              this.setState({foundBooks: foundBooks})
            }
          })
        }
      }

      render() {
        const { foundBooks } = this.state
        return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                  <div className="search-books-input-wrapper">
                    <input
                      type='text'
                      placeholder='Search by title or author'
                      onChange={(event) => this.searchBooks(event.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                    {foundBooks.map((foundBook) => {
                      return (
                        <li key={foundBook.id}>
                          <div className="book">
                            <div className="book-top">
                              {
                                foundBook.imageLinks &&
                                <div className="book-cover" style={{
                                  width: 128,
                                  height: 193,
                                  backgroundImage: `url(${foundBook.imageLinks.thumbnail})`
                                }}>
                                </div>
                              }
                              <div className="book-shelf-changer">                              
                                <select>
                                 <option value="none" disabled>Move to...</option>
                                 <option value="currentlyReading">Currently Reading</option>
                                 <option value="wantToRead">Want to Read</option>
                                 <option value="read">Read</option>
                                 <option value="none">None</option>
                               </select>
                             </div>
                           </div>
                           <div className="book-title">{foundBook.title}</div>
                           <div className="book-authors">{foundBook.authors.join(', ')}</div>
                        </div>
                      </li>)
                    }
                  )}
                </ol>
            </div>
        </div>
      )
    }
  }

export default SearchBooks
