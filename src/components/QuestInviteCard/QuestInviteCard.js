import React, {PropTypes} from 'react';
import axios from '../Requests/FirebaseInstance'

import classes from './QuestInviteCard.module.scss'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const QuestInviteCard = (props) => {

  const {data, onSelectQuestId, id} = props

  const fetchRewards = () => {
    return data.reward.map(reward => {
      return (
          <p key={reward.id} className={"desktopDescription"}>x{reward.amount} {reward.name}</p>
      )
    })
  }

  return(
    <Paper className={classes.QuestInviteCardContainer}>
      <img src={data.image} alt="Kensington Market Cover" className={classes.QuestInviteCoverImage}/>
      <div className={classes.QuestInfoContainer}>
        <p className={"desktopHeader"}>
          {data.name}
        </p>
        <div className={[classes.SubheaderContainer, classes.QuestInviteCardSubheaderContainer]}>
          <span className={"desktopSubheader"}>{data.location.name}</span>
          <span className={"desktopSubheader"}>Difficulty {data.difficulty}/5</span>
        </div>
        <div className={"paragraphContainer"}>
          <p className={"desktopDescription"}>
            {data.description}
          </p>
        </div>
        <div className={classes.RewardContainer}>
          <span className={"desktopSubheader"}>Reward</span>
          <div className={classes.RewardsList}>
            {fetchRewards()}
          </div>
        </div>
        <Button onClick={() => onSelectQuestId(id)} variant="contained" className={["primaryButton", classes.QuestInviteCardAcceptButton]}>
          Accept
        </Button>
      </div>
    </Paper>
  )

}

// const QuestInviteCardPropTypes = {
//   studentRecordData: PropTypes.array.isRequired,
// };

// QuestInviteCard.propTypes = QuestInviteCardPropTypes;

export default QuestInviteCard;
