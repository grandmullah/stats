import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import ens from '../contracts/ens.json'
import token from '../contracts/usd.json'
import { ethers } from "ethers";
import moment from 'moment'
// import web3 from 'web3'
// Generate Order Data;
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


export default function Orders() {
  const classes = useStyles();
  const [data ,updateData] = React.useState([])


  const events =async ()=> {
    const Provider = new ethers.providers.InfuraProvider('ropsten')
    
    const Wallet = new ethers.Wallet('11a6606b9613acb504cd7c202ea175be486af1df3b8029a90ad923ed301ab9e6',Provider)
    const usdContract  = new ethers.Contract('0xC0972d8A369b27Fe52aD88A98FcBA786884D13e4',token.output.abi ,Wallet)
    const contract = new ethers.Contract('0x4BFfA6a35aF716e940e9a7D1B29b44cAE9578e8b',ens.output.abi,Wallet)
    console.log(usdContract)

    const  his = await  usdContract.queryFilter('Transfer')
    console.log(his)
    const Arr = []
    for (let i = 0; i < his.length; i++) {
      const tx = {
        time: moment.unix((await Provider.getBlock(his[i].blockNumber)).timestamp).format('MMMM Do YYYY, h:mm:ss a'),
        from: his[i].args[0],
        to:his[i].args[1],
        nameFrom :  await contract.ens(his[i].args[0]),
        nameTo : await contract.ens(his[i].args[1]),
        txhash:his[i].transactionHash,
        amount: ethers.utils.formatEther(his[i].args[2])
        
      }
     Arr.push(tx)
    }
     console.log(Arr)
     updateData(Arr)

}


  React.useEffect(()=> {
            const ff = events()

            console.log(ff)
  },[])
  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Time</TableCell>
            <TableCell align="center">From</TableCell>
            <TableCell align="center">To</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Info</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.time}>
              <TableCell align="left">{`${row.time}`}</TableCell>
              <TableCell align="left">{`${row.from} (${row.nameFrom})` }</TableCell>
              <TableCell align="left">{`${row.to} (${row.nameTo})`}</TableCell>

              <TableCell align="left">{row.amount}</TableCell>
              <TableCell   align="center"><Link color="inherit" href= {`https://ropsten.etherscan.io/tx/${row.txhash}`}>more Info</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}