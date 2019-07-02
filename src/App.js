import React from 'react';
import './App.modules.scss';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import QuestPool from './components/QuestPool/QuestPool'
import QuestTasks from './components/QuestTasks/QuestTasks'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedQuestId: null,
      questCompleted: false,
    }
  }

  setSelectedQuestId = (id) => {
    this.setState({
      selectedQuestId: id
    })
  }

  setupQuestCompletion = (isQuestComplete) => {
    if (isQuestComplete) {
      this.setState({
        questCompleted: true
      })
    }
  }

  resetQuestId = () => {
    this.setState({
      selectedQuestId: null
    })
  }

  render() {

    const {selectedQuestId} = this.state

    return (
    <Router>
        {!this.state.selectedQuestId &&
          <QuestPool 
            selectedQuestId = {this.setSelectedQuestId}
          />
        }
      <Route path="/quest" render={(routeProps) => (
        !this.state.selectedQuestId ? (
          <Redirect to="/"/>) 
        : 
        (<QuestTasks 
          selectedQuestId = {selectedQuestId}
          isQuestComplete = {this.setupQuestCompletion}
          resetQuestId= {() => this.resetQuestId()}
          {...routeProps}
        />)
      )}/>
    </Router>
    );

  }
}

export default App;
