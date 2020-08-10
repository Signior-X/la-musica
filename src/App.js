import React from 'react';
import logo from './logo.svg';
import './App.css';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      where: 'searching',
      songName: ''
    };
  }

  handleChange(event){
    console.log('value', event.target.value);
    this.setState({
      songName: event.target.value
    })
  }

  handleSongSearch(){
    this.setState({
      where: 'searched'
    });
    console.log('searching', this.state.songName);
    fetch("https://la-musica.herokuapp.com/api/getdata", {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.songName
      })
    })
    .then(data => {

      console.log('Data', data);
      
    })
    .catch(error => {
      console.log("Error, err");
    });
  }

  render() {
    return (
      <div id="main-content">
        <h1 className="center heading">Hello {this.props.name}</h1>

        <div className={this.state.where}>
          <form
            id="song-input-form"
            onSubmit={(event) => {
              event.preventDefault();
              this.handleSongSearch()
            }}
          >

            <input
              id="song-input"
              placeholder="Enter song name" required
              value={this.state.songName}
              onChange={(event) => this.handleChange(event)}
            ></input>
            <button type="submit">Search</button>
            
          </form>

        </div>
      </div>
    );
  }
}


function App() {
  return (
    <Main name="Priyam" />
  );
}

export default App;
