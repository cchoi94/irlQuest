import React from 'react';
import axios from '../Requests/FirebaseInstance'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class EndSection extends React.Component {

  constructor(){
    super()
    this.state = {
      email: null,
      errorMsg: null
    }
  }

  submitEmail = (event) => {
    const existingEmailsArray = []

    axios.get('/email.json').then(response => {
      Object.keys(response.data).forEach(item => {
        existingEmailsArray.push(response.data[item].email)
      });

      if (existingEmailsArray.includes(this.state.email)) {
        this.setState({
          errorMsg: 'Hey it looks like you have already entered this email'
        })
        setTimeout(() =>{this.setState({errorMsg: null})}, 2000)
      } else {
        axios.post('/email.json', {
          email: this.state.email
        })
        .then( response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      }
    }).catch(error => {
      console.log(error)
    })
    event.preventDefault()
  }

  emailChange = (event) => {
    const email = event.target.value
    this.setState({
      email
    })
  }

  componentDidMount() {
    
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
