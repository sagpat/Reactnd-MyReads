import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBooks extends Component{

  static PropTypes = {
    onAdjustFoundBooksShelf: PropTypes.func.isRequired,
    onAdjustBookShelf: PropTypes.func.isRequired
  }

    state = {
      foundBooks: []
    }

    clearBookState = () => {
      this.setState({ foundBooks:[] })
    }


    handleBookSearch =(query) =>{
        if(query.length === 0){
          this.clearBookState()
          }
          else {
            BooksAPI.search(query).then((foundBooks) => {
              if(foundBooks.error){
                this.clearBookState()
              }
              else {
                this.setState({foundBooks: this.props.onAdjustFoundBooksShelf(foundBooks)})
              }
            })
          }
        }


        adjustFoundBooksShelf = (bookInTransition, shelf) =>{
          this.props.onAdjustBookShelf(bookInTransition, shelf)
            this.setState(state =>({
              foundBooks: state.foundBooks.map((foundBook) => {
                if(foundBook.id === bookInTransition.id){
                  foundBook.shelf = shelf
                  return foundBook
              }else {
                return foundBook
              }
              })
            }))
        }


      render() {

        const { foundBooks } = this.state

        return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                    <input
                      type='text'
                      placeholder='Search By Title or Author'
                      onChange={(event) => this.handleBookSearch(event.target.value)}
                    />
                </div>
           </div>

              <div className="search-books-results">
                <ol className="books-grid">
                    {foundBooks.map((foundBook) => {
                      return <li key={foundBook.id}>
                        <Book book={foundBook} onAdjustBookShelf={this.adjustFoundBooksShelf} />
                      </li>
                    }
                  )}
                </ol>
             </div>
        </div>
      )
    }
  }

export default SearchBooks
