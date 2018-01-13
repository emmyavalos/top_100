import React, { Component } from 'react';
import axios from 'axios';
import SongForm from './components/SongForm'

class App extends Component {
  state = {
    songs: [],
    newSongTitle: '',
    newSongArtist: '',
    editing: false,
  }

  componentDidMount() {
    axios.get('/api/songs')
    .then( res => {
        this.setState({songs: res.data})
    })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let { newSongArtist, newSongTitle } = this.state
    axios.post('api/songs', {artist: newSongArtist, title: newSongTitle})
    .then( res => {
      this.setState({
        songs: [...this.state.songs, res.data],
        newSongArtist: '',
        newSongTitle: ''
      })
    })
  }

  handleEdit = (id) => {
    this.setState({
      editing: !this.state.editing
    })
  }

  handleDelete = (id) => {
    axios.delete(`/api/songs/${id}`)
      .then( res => {
        if(res.data.status === 'ok') {
          this.setState({
            songs: this.state.songs.filter(song => song.id !== id)
          })
        }
      })
    }

  render() {
    return (

      <div>
        <h1>This is the Top 100 songs</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.NewSongArtist}
            name='newSongArtist'
            onChange={this.handleChange}
            placeholder='Artist'
            required
          />
          <input
            value={this.state.NewSongTitle}
            name='newSongTitle'
            onChange={this.handleChange}
            placeholder='Title'
            required
          />
          <button type='submit'>Submit</button>
        </form>
        { this.state.editing ? <SongForm/> : null }
        <ol>
          {this.state.songs.map( song => {
            return(
            <li key={ song.id } >
              Artist: {song.artist} Title: {song.title}
              <button onClick={() => this.handleDelete(song.id)}>Delete</button>
              <button onClick={() => this.handleEdit(song.id)}>Edit</button>
            </li>
          )
          })}
        </ol>
      </div>
    );
  }
}

export default App;
