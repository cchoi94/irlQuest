import React from 'react';
import axios from '../Requests/FirebaseInstance'

class EndSection extends React.Component {

  constructor(){
    super()
    this.state = {

    }
  }

  test = () => {
    axios.post('/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    
  }

  render() {
    return(
      <div>
        <button onClick={() => this.test()}>Post</button>
      </div>
    )
  }
}


export default EndSection;
