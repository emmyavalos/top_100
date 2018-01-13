import React from 'react'

class SongForm extends React.Component{
  state={title: '', artist: '' }

  handleChange = (e) => {
  }

  handleSubmit = (e) => {
  }


render() {
  const { title, artist } = this.state
  return(
    <form onSubmit={this.handleSubmit}>
      <input
        value={artist}
        name='artist'
        onChange={this.handleChange}
        placeholder='Artist'
        required
      />
      <input
        value={title}
        name='title'
        onChange={this.handleChange}
        placeholder='Title'
        required
      />
      <button type='submit'>Submit</button>
    </form>
  )
}
}

export default SongForm;
