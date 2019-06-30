import React from 'react';

import axios from '../Requests/FirebaseInstance'
import uniqid from 'uniqid'
import Swal from 'sweetalert2'

import Task from '../Task/Task'


class QuestTasks extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      questData: null,
      questUniqIds: [],
      questTaskProgress: 1,
      showIncorrectMsg: false
    }
  }

  componentDidMount () {
    axios.get('/quests.json').then(response => {
      let questDataArray = response.data
      let questData = null
      let uniqidArray = []

     questDataArray.forEach(quest => {

        quest.quest_tasks.forEach(task => {
          let uniqueId = uniqid(Math.random())
            uniqidArray.push(uniqueId)
        })


       if (quest.id === this.props.selectedQuestId) {
         questData = quest.quest_tasks
       }
     })


      this.setState({
        questData,
        questUniqIds: uniqidArray
      })
    })
  }


  questProgress = (id, task_number, answer, submittedAnswer, event) => {
    event.preventDefault()
    // console.log(id, task_number, answer, submittedAnswer, event)

    let idCheckInt = task_number - 1

    if (this.state.questUniqIds[idCheckInt] === id && answer === submittedAnswer) {
      Swal.fire({
        type: 'success',
        title: 'Correct!',
        confirmButtonText: 'Continue'
      }).then(result => {window.scrollTo(0, 0)})
      this.setState({
        questTaskProgress: task_number + 1
      })
    } else if (answer !== submittedAnswer) {
      Swal.fire({
        type: 'error',
        title: 'Incorrect!',
        confirmButtonText: 'Try again'
      })
      // this.setState({
      //   showIncorrectMsg: true
      // }, () => {
      //   setTimeout(() => {this.setState({showIncorrectMsg: false})}, 3000)
      // })
    }

    
  }

    render() {

      const fetchTaskList = () => {
      
      let questData = [...this.state.questData]

      return questData.map((quest, index) => {
        const questUniqIds = [...this.state.questUniqIds]

        return (
          <div>
            {quest.task_number === this.state.questTaskProgress ?
              <Task 
                key={quest.task_number}
                data={quest}
                totalNumberOfTasks={questData.length}
                questProgress={this.questProgress}
                uniqueId={questUniqIds[index]}
                answerIsIncorrect={this.state.showIncorrectMsg}
              />
            :
              null
            }
          </div>
        )
      })

    }
      


      return (
        <div>
          {this.state.questData ?
            fetchTaskList()
          :
            null
          }
        </div>
      )
    }
}

export default QuestTasks