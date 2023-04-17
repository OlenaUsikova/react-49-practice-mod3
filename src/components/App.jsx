import React, {Component} from "react"
import { MoviesGallery } from "./MoviesGallery/MoviesGallery"
import movies from '../data/data.json'
import { Modal } from "./Modal/Modal";

export class App extends Component{
  state = {
    movies:movies,
  currentPoster: null  };
  componentDidMount(){
    const dataMov = localStorage.getItem('movies')
    if(dataMov !== null){
      this.setState({movies:JSON.parse(dataMov)})
    }
  } 
  componentDidUpdate(_, prevState) {
    if(this.state.movies !== prevState.movies){
      localStorage.setItem("movies", JSON.stringify(this.state.movies))
    }
  }
  openModal = (data) => {
    this.setState({currentPoster: data})
  }
  closeModal = () => {
    this.setState({currentPoster: null})
  }
handleDelete = id => {
    this.setState((prevState) => {
    return {movies:prevState.movies.filter((movie) => movie.id !== id)}
  })}
  render(){
const {movies, currentPoster} = this.state;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101'
      }}
    >
      <MoviesGallery movies={movies} onDelete={this.handleDelete} openModal={this.openModal}/>
      {currentPoster && <Modal currentPoster={this.state.currentPoster} closeModal={this.closeModal}/>}
       </div>
  )}
}
