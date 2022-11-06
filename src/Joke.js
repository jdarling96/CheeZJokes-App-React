import React from "react";
import "./Joke.css";
import JokeList from "./JokeList";
const Joke = props => (
  
  <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={() => props.vote(props.id, +1)}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={() => props.vote(props.id, -1)}>
          <i className="fas fa-thumbs-down" />
        </button>

        {props.votes}
      </div>

      <div className="Joke-text">{props.text}</div>
    </div>

)

export default JokeList(Joke)