import logo from './logo.svg';
import './App.css'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Dashboard2 from './components/dash';
import DashboardM from './components/dashmint';
import Registered from './components/registered';

// import { Drizzle } from '@drizzle/store'
// import { DrizzleContext } from '@drizzle/react-plugin'
// const drizzleOptions = {
//   contracts: [
//    token
//   ],
//   events: {
//     token: ["transfer"],
//   },
// }

// eslint-disable-next-line no-undef
// const drizzle = new Drizzle(drizzleOptions)

function App() {
  return (
    <BrowserRouter>
 <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/burn" element={<Dashboard2 />} />
        <Route path='/mint' element={<DashboardM />}/>
        <Route path='/users' element={<Registered />}/>
      </Routes>
    </BrowserRouter>
          )

}

export default App;

