import React from 'react';
import axios from '../Requests/FirebaseInstance'

export const postEmail = (questId, email) => {

  axios.post(`/email/quest_${questId}.json`, {
      email
    })
    .then(response => {
    })
    .catch(error => {
      console.log(error);
    });
}

export const checkForDuplicateEmails = (questId) => {

  return axios.get(`/email/quest_${questId}.json`).then(response => {
    return response
  }).catch(error => {
    console.log(error)
  })
}


// export default QuestPool;