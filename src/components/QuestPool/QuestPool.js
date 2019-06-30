import React from 'react';
import axios from '../Requests/FirebaseInstance'

import QuestInviteCard from '../QuestInviteCard/QuestInviteCard'
import EndSection from '../EndSection/EndSection'

class QuestPool extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      questPool: [],
    }
  }

  componentDidMount() {
    axios.get('/quests.json').then(response => {
      this.setState({
        questPool: response.data
      })
    })
  }

  onSelectQuestId = (id) => {
    this.props.selectedQuestId(id)
  }

  render() {

    const {selectedQuestId} = this.props

    const fetchQuestPool = () => {
      let questPool = [...this.state.questPool]

      return questPool.map(quest => {
        return (
          <QuestInviteCard 
            key = {quest.id}
            id = {quest.id}
            data = {quest.quest_invite_card}
            onSelectQuestId = {this.onSelectQuestId}
          />
        )
      })

    }

    return(
      <div>
        {selectedQuestId ? fetchQuestPool() : null}
      </div>
    )
  }
}


export default QuestPool;
