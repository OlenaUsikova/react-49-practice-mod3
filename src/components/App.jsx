import React, { Component } from 'react';
import { MoviesGallery } from './MoviesGallery/MoviesGallery';

import { Modal } from './Modal/Modal';
import { fetchMovies } from 'services/movie-api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    movies: [],
    currentPoster: null,
    isListShown: false,
    page: 1,
    isLoader: false,
    error: '',
  };
 
  componentDidUpdate(_, prevState) {
   if ((this.state.isListShown !== prevState.isListShown || prevState.page !== this.state.page) && this.state.isListShown === true){
    this.getMovies();
   }
   if(this.state.isListShown !== prevState.isListShown && this.state.isListShown === false){
    this.setState({movies: [], page: 1});
   }
  };
  handleDelete = id => {
    this.setState(prevState => {
      return { movies: prevState.movies.filter(movie => movie.id !== id) };
    });
  };
  openModal = data => {
    this.setState({ currentPoster: data });
  };
  closeModal = () => {
    this.setState({ currentPoster: null });
  };

  toggleList = () => {
    this.setState((prevState) => ({isListShown : !prevState.isListShown}))
  };
  getMovies = ()=> {
this.setState({isLoading: true});
fetchMovies(this.state.page).then(({data: {results}}) => {
  this.setState(prevState => ({movies: [...prevState.movies, ...results]}))
}).catch(error => this.setState({error: error.message})).finally(() => this.setState({isLoading:false}))
  };
 loadMore = () => {this.setState
  (prevState => ({page: prevState.page + 1}))}

  render() {
    const { movies, currentPoster, isListShown } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          color: '#010101',
        }}
      >
        <Button text={isListShown ? "Hide movies list" : "Show movies"}
         clickHandler={this.toggleList}/>
         {this.state.isLoading && <Loader/>}
        {isListShown && (
          <div>
        <MoviesGallery
        movies={movies}
        onDelete={this.handleDelete}
        openModal={this.openModal}
      />
      <Button text = "Load more" clickHandler = {this.loadMore}/>
      </div>)}
      {currentPoster && 
        (<Modal
          poster={currentPoster}
          onClose={this.closeModal}/>)
          }
       </div>
    );
  }
}
