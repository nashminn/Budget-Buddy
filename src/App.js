import logo from './logo.svg';
import './App.css';
import { Layout } from './components/Layout';

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Accounts } from './pages/Accounts/Accounts';
import { Budgets } from './pages/Budgets';
import { Transactions } from './pages/Transactions/Transactions';
import { Debts } from './pages/Debts';
import { Calendar } from './pages/Calendar';

function App() {
  
  return (
    <div className="App">

         {/* asdf asdpfk a sofafs 
         <div style={{background: '#ff0000', justify: 'flex-begin'}} align="left">help</div>
         <div style={{background: '#00ff00', justify: 'flex-begin'}}>help</div>
         <div style={{background: '#0000ff', justify: 'flex-begin'}}>help</div> */}
         <Routes>
          <Route path='/' element={ <Home /> }/>
          <Route path='/transactions' element={ <Transactions openSidebar={true}/> }/>
          <Route path='/accounts' element={ <Accounts openSidebar={true}/> }/>
          <Route path='/budgets' element={ <Budgets openSidebar={true}/> }/>
          <Route path='/debts' element={ <Debts openSidebar={true}/> }/>
          <Route path='/calendar' element={ <Calendar openSidebar={true}/> }/>
         </Routes>

    </div>
  );
}

export default App;
