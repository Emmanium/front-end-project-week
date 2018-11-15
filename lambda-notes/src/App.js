import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import './App.css';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import NoteView from './components/NoteView';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      notes: [],
      title: '',
      textBody: '',
    }
  }

  componentDidMount(){
    this.getNotes();
  }

  getNotes = () => {
    axios.get('https://fe-notes.herokuapp.com/note/get/all')
      .then(response => {
        console.log(response)
        this.setState({ notes: response.data })
      })
      .catch(err => console.log(err))
  }

  postNote = (newNote) => {
    axios.post('https://fe-notes.herokuapp.com/note/create', newNote)
      .then(response => this.setState({ notes: response.data }))
      .err(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <NavLink to="/">View Your Notes</NavLink>
        <NavLink to="/create">+Create New Note</NavLink>

        <Route exact path="/" render={props => <NotesList {...props} notes={this.state.notes}/>} />
        <Route path="/create" render={props => <CreateNote {...props} postNote={this.postNote}/>} />
        <Route path="/view/:id" render={props => <NoteView {...props}/>} />

      </div>
    );
  }
}

export default App;
