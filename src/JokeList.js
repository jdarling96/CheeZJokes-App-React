import React, { useState, useEffect, Component } from "react";
import axios from "axios";
//import Joke from "./Joke";
import "./JokeList.css";
import "./Joke.css";

class JokeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);
  }

  async componentDidMount() {
    let j = [...this.state.data];
    let seenJokes = new Set();
    try {
      while (j.length < this.props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
        let { status, ...jokeObj } = res.data;

        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          j.push({ ...jokeObj, votes: 0 });
        } else {
          console.error("duplicate found!");
        }
      }
      this.setState({ data: j });
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidUpdate() {
    let j = [...this.state.data];
    let seenJokes = new Set();
    try {
      while (j.length < this.props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
        let { status, ...jokeObj } = res.data;

        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          j.push({ ...jokeObj, votes: 0 });
        } else {
          console.error("duplicate found!");
        }
      }
      this.setState({ data: j });
    } catch (e) {
      console.log(e);
    }
  }

  generateNewJokes() {
    this.setState({ data: [] });
  }

  vote(id, delta) {
    this.setState({
      data: this.state.data.map((j) =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      ),
    });
  }

  render() {
    if (this.state.data.length) {
      let sortedJokes = [...this.state.data].sort((a, b) => b.votes - a.votes);

      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>

          {sortedJokes.map((j) => (
            <div key={j.id} className="Joke">
              <div className="Joke-votearea">
                <button onClick={() => this.vote(j.id, +1)}>
                  <i className="fas fa-thumbs-up" />
                </button>

                <button onClick={() => this.vote(j.id, -1)}>
                  <i className="fas fa-thumbs-down" />
                </button>

                {j.votes}
              </div>

              <div className="Joke-text">{j.joke}</div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  }
}

export default JokeList;
