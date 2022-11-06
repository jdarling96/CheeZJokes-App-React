import React from "react";
import axios from "axios";
//import Joke from "./Joke";
import "./JokeList.css";
import "./Joke.css";

const JokeList = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { data: [] };
      this.state = {loading: false}
      this.generateNewJokes = this.generateNewJokes.bind(this);
      this.vote = this.vote.bind(this);
    }

    async componentDidMount() {
      let j = [...this.state.data];
      let seenJokes = new Set();
      try {
        while (j.length < 10) {
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
        while (j.length < 10) {
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
        let sortedJokes = [...this.state.data].sort(
          (a, b) => b.votes - a.votes
        );
        //console.log(sortedJokes)

        return (
          <div className="JokeList">
            <button
              className="JokeList-getmore"
              onClick={this.generateNewJokes}
            >
              Get New Jokes
            </button>

            {sortedJokes.map((j) => (
              <Component
                {...this.props}
                text={j.joke}
                key={j.id}
                id={j.id}
                votes={j.votes}
                vote={this.vote}
              />
            ))}
          </div>
        );
      }

      return null;
    }
  };
};

export default JokeList;
