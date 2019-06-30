import React from 'react'

import classes from './Task.module.scss'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const Task = (props) => {
  console.log(props)
  const {data, totalNumberOfTasks, questProgress, uniqueId} = props

  const generateIcons = () => {
    return (
      data.icons.map(icon => {
        return (
          <p>{icon.type}</p>
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
          />
          <Button onClick={() => questProgress(uniqueId)} variant="contained" className={`primaryButton ${classes.TaskSubmitButton}`}>
            Submit
        </Button>
        </Paper>
    )
}

export default Task