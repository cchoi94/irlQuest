import React from 'react';
import axios from '../Requests/FirebaseInstance'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Swal from 'sweetalert2'

import {checkForDuplicateEmails, postEmail} from './EndSectionRequests'
import classes from './EndSection.module.scss'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'

import coinIcon from '../../assets/icons/coinsColour.png'

class EndSection extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      email: null,
      errorMsg: null,
      data: null,
      emailSent: false
    }
  }

  componentDidMount() {
    let queryId = this.props.selectedQuestId - 1

    axios.get(`/quests/${queryId}/completion_page.json`).then(response => {
      this.setState({
        data: response.data
      })
    })
  }

  submitEmail = (event) => {
    event.preventDefault()
    const existingEmailsArray = []

    checkForDuplicateEmails(this.props.selectedQuestId).then(response => {
      if (response.data) {
        Object.keys(response.data).forEach(item => {
          existingEmailsArray.push(response.data[item].email)
        });

        if (existingEmailsArray.includes(this.state.email)) {
          Swal.fire({
            type: 'error',
            title: 'Hey! Looks like this email has been used.',
            confirmButtonText: 'Okay'
          })
        } else {
          postEmail(this.props.selectedQuestId, this.state.email)
          this.setState({
            emailSent: true
          })
        }
      } else {
        postEmail(this.props.selectedQuestId, this.state.email)
        this.setState({
          emailSent: true
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  emailChange = (event) => {
    const email = event.target.value
    this.setState({
      email
    })
  }
  
  render() {

    const {data, errorMsg, emailSent} = this.state

    const generateDescription = () => {
      return (
        data.description.map(description => {
          return (
            <p className={"description"}>{description.text}</p>
          )
        })
      )
    }

    const fetchRewards = () => {
      return data.reward.map(reward => {
        return (
            <p key={reward.id} className={"description"} style={{fontWeight: 'bold'}}>x{reward.amount} {reward.name}</p>
        )
      })
    }

    return(
    (this.state.data ? 
      <form onSubmit={this.submitEmail}>
        <Paper className={`container ${classes.EndSectionFormContainer}`}>
          <img src={coinIcon} style={{width: '64px', height: '64px', marginBottom: '16px'}} alt="Gold Coin"></img>
          {emailSent ?
          <div>
            <p className={"cardTaskSubheader"}>Reward Claimed!</p>
            <p className={"description"}>You’ve been entered into the monthly draw for the following rewards:</p>
            {fetchRewards()}
            <Link to="/">
              <p style={{marginTop: '213px'}} onClick={this.props.resetQuestId} className={classes.returnToQuestLog}>Return to Quest Log</p>
            </Link>
          </div>
          :
          <div>
            <p className={"cardTaskSubheader"}>Quest Complete!</p>
            {generateDescription()}
            {fetchRewards()}
            <Input
              placeholder="youremail@domain.com"
              value={this.state.emailInput}
              onChange={this.emailChange}
              type="email"
              inputProps={{
                'aria-label': 'Description',
              }}
              style={{margin: '71px 0 32px 0'}}
              fullWidth
            />
            <Button variant="contained" type="submit" className={`primaryButton ${classes.TaskSubmitButton}`} disabled={!this.state.email}>I want to enter the draw</Button>
            <Link to="/">
              <p onClick={this.props.resetQuestId} className={classes.returnToQuestLog}>No, thank you</p>
            </Link>
          </div>
          }
          {errorMsg && errorMsg}
        </Paper>
      </form>
    :
    null
    ))
  }
}


export default EndSection;
