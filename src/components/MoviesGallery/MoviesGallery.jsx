
import React from "react";
export const MoviesGallery = ({movies, onDelete, openModal})=> {
    return (
        <ul>
            {movies.map(movie => {
                return(<li  key = {movie.id}>
                        <h2>{movie.title}</h2>
                        <p>{movie.vote_count}</p>
                        <button onClick = {() => {onDelete(movie.id)}}>Delete</button>
                        <button onClick = {()=>{openModal({src: movie.poster_path})}}>Show poster</button>
                </li>)
            })}
            
        </ul>
    )
}