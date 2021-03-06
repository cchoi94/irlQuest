import React, {PropTypes} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import classes from './QuestInviteCard.module.scss'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const QuestInviteCard = (props) => {

  const {data, onSelectQuestId, id} = props

  const fetchRewards = () => {
    return data.reward.map(reward => {
      return (
          <p key={reward.id} className={"description"}>x{reward.amount} {reward.name}</p>
      )
    })
  }

  const mobile = useMediaQuery('(max-width:1024px)');

  const levelSubheaderStyle = {
    color: '#FFB300'
  }

  return(
    <Paper className={classes.QuestInviteCardContainer}>
      {mobile ? 
       <img src={data.imageMobile} alt="Kensington Market Cover" className={classes.QuestInviteCoverImage}/>
      :
      <img src={data.imageDesktop} alt="Kensington Market Cover" className={classes.QuestInviteCoverImage}/>
      }
      <div className={"infoContainer"}>
        <p className={"header"}>
          {data.name}
        </p>
          <span className={"subheader"}>{data.location.name} | </span>
          <span className={`subheader`} style={levelSubheaderStyle}>Level {data.level}</span>
          <p className={"description"}>
            {data.description}
          </p>
        <div className={classes.RewardContainer}>
          <span className={"subheader"}>Reward</span>
          <div className={classes.RewardsList}>
            {fetchRewards()}
          </div>
        </div>
        <Link to="/quest">
          <Button onClick={() => onSelectQuestId(id)} variant="contained" className={`primaryButton ${classes.QuestInviteCardAcceptButton}`}>
            Accept
          </Button>
        </Link>
      </div>
    </Paper>
  )

}

// const QuestInviteCardPropTypes = {
//   studentRecordData: PropTypes.array.isRequired,
// };

// QuestInviteCard.propTypes = QuestInviteCardPropTypes;

export default QuestInviteCard;
