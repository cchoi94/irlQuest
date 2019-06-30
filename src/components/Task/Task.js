import React from 'react'

import classes from './Task.module.scss'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import searchIcon from '../../assets/icons/search.png'
import puzzleIcon from '../../assets/icons/puzzle.png'
import chatIcon from '../../assets/icons/chat.png'
import qrcodeIcon from '../../assets/icons/qrCode.png'


class Task extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      taskEvent: ''
    }
  }

  handleTaskAnswerValue = (event) => {
    this.setState({taskAnswer: event.target.value})
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {

  const {data, totalNumberOfTasks, questProgress, uniqueId} = this.props

  const generateIcons = () => {
    return (
      data.icons.map(icon => {
        return (
          <div>
            {icon.type === 'search' &&
              <img src={searchIcon} alt="search icon"/>
            }
            {icon.type === 'puzzle' &&
              <img src={puzzleIcon} alt="puzzle icon"/>
            }
            {icon.type === 'chat' &&
              <img src={chatIcon} alt="chat icon" />
            }
            {icon.type === 'qrcode' &&
              <img src={qrcodeIcon} alt="QR code icon" />
            }
          </div>
        )
      })
    )
  }

  const generateDescription = () => {
    return (
      data.description.map(description => {
        return (
          <p className={"description"}>{description.text}</p>
        )
      })
    )
  }
    
    return(
      <form onSubmit={(event) => questProgress(uniqueId, data.task_number, data.answer, this.state.taskAnswer, event)}>
        <Paper className={"container"}>
          <p style={{textAlign: 'right', fontWeight: 'bold'}}>{data.task_number}/{totalNumberOfTasks}</p>
          <div className={"cardTaskNumber"}>
            <p style={{fontSize: 34, paddingBottom: '25%'}}>{data.task_number}</p>
          </div>
          <p className={"cardTaskSubheader"}>{data.title}</p>
          <div className="iconBox">
            {generateIcons()}
          </div>
            {generateDescription()}
          <Input
            placeholder="What's the answer"
            className={"input"}
            fullWidth
            value={this.state.taskAnswer}
            onChange={this.handleTaskAnswerValue}
          />
          <Button variant="contained" type="submit" className={`primaryButton ${classes.TaskSubmitButton}`}>
            Submit
          </Button>
        </Paper>
      </form>
    )
  }
}

export default Task