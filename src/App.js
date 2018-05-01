import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import MyReads from './MyReads'
import SearchBooks from './SearchBooks'
import NotFound from './NotFound'

class BooksApp extends React.Component {

  state = {
    books:[]
  }

  componentDidMount(){
    this.getAllBooks()
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
        this.setState({books});
    })
  }

// This is a change for develop branch!!
  findInBookShelf = (books, bookToFind) => (books.find((book) => (book.id === bookToFind.id)))

  adjustBooksShelf = (bookInTransition, shelf) => {
    BooksAPI.update(bookInTransition, shelf).then(() =>{
      this.setState(state => {
        let books = state.books
        const bookInShelf = this.findInBookShelf(this.state.books, bookInTransition)

        if(bookInShelf){
          if(shelf !== 'none'){
            books = books.map((book) => {
              if(book.id === bookInShelf.id){
                book.shelf = shelf
              }
              return book
            })
          }
          else {
            books = books.filter((book)=> book.id !== bookInTransition.id)
          }
        }else{
          if(shelf !== 'none')
            books = books.concat([bookInTransition])
        }
      return { books:books }
      })
    })
  }


  adjustFoundBooksShelf = (foundBooks) => {
    return foundBooks.map((foundBook) => {
      const foundBookInShelf = this.findInBookShelf(this.state.books, foundBook)
        if(foundBookInShelf){
          foundBook.shelf = foundBookInShelf.shelf
        }
        return foundBook
    })
  }


  render() {
    return (
          <div className="app">
            <Switch>
              <Route exact path="/" render={() =>(
                   <MyReads
                     books={this.state.books}
                     onAdjustBookShelf={this.adjustBooksShelf} />
              )}/>

              <Route path="/search" render={()=>(
                <SearchBooks
                    onAdjustFoundBooksShelf={this.adjustFoundBooksShelf}
                    onAdjustBookShelf={this.adjustBooksShelf}
                />
              )}/>

              <Route component={NotFound} />
            </Switch>
          </div>
    )
  }
}

export default BooksApp
