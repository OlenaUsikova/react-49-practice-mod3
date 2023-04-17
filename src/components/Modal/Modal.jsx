import { Component } from "react";

export class Modal extends Component{
    render(){
        const {src, alt} = this.props.currentPoster
        return(
        <div>
            <div>
                <button onClick={this.props.closeModal}>Close</button>
                <img src ={`https://image.tmdb.org/t/p/w500${src}`} alt = {alt}></img>
                </div>
        </div>)
    }
}