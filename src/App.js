import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import SearchBooks from './SearchBooks'


class BooksApp extends React.Component {
  state = {
    books:[]
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
        this.setState({books})
    })
  }

  render() {
    return (
      <div className="app">
        {/* <Route exact path="/" render={() =>(
            <Books books={this.state.books} />
        )}/> */}

        {/* Tried Developing the seach first and it worked */}
        <Route path="/search" render={()=>(
          <SearchBooks/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
