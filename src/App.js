import React from 'react';
import './App.modules.scss';

import EndSection from './components/EndSection/EndSection'
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

  render() {

    const {selectedQuestId} = this.state

    return (
      <div className="app">
        {!this.state.selectedQuestId ?
          <QuestPool 
            selectedQuestId = {this.setSelectedQuestId}
          />
        :
          <QuestTasks 
            selectedQuestId = {selectedQuestId}
            isQuestComplete = {this.setSelectedQuestId}
          />
        }
        {this.state.questCompleted ? 
          <EndSection 
            questId={this.state.selectedQuestId}
          />
        :
          null
        }
      </div>
    );

  }
}

export default App;
