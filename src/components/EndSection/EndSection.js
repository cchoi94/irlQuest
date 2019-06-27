import React from 'react';
import axios from '../Requests/FirebaseInstance'

import {checkForDuplicateEmails, postEmail} from './EndSectionRequests'

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class EndSection extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      email: null,
      errorMsg: null
    }
  }

  submitEmail = (event) => {
    event.preventDefault()
    const existingEmailsArray = []

    checkForDuplicateEmails(this.props.questId).then(response => {
      if (response.data) {
        Object.keys(response.data).forEach(item => {
          existingEmailsArray.push(response.data[item].email)
        });

        if (existingEmailsArray.includes(this.state.email)) {
          this.setState({
            errorMsg: 'Hey it looks like you have already entered this email'
          })
          setTimeout(() =>{this.setState({errorMsg: null})}, 2000)
        } else {
          postEmail(this.props.questId, this.state.email)
        }
      } else {
        postEmail(this.props.questId, this.state.email)
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
    return(
      <form onSubmit={this.submitEmail}>
        <Input
          placeholder="Email"
          value={this.state.emailInput}
          onChange={this.emailChange}
          type="email"
          inputProps={{
            'aria-label': 'Description',
          }}
      />
        {this.state.errorMsg && this.state.errorMsg}
        <Button type="submit">Post</Button>
      </form>
    )
  }
}


export default EndSection;
