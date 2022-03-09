import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import token from '../contracts/usd.json'
import { ethers } from "ethers";
import moment from 'moment'
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{props.name}</Title>
      <Typography component="p" variant="h4">
       {props.amount}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {moment().format('MMMM Do YYYY, h:mm:ss a')}
      </Typography>
      <div>

      </div>
    </React.Fragment>
  );
}