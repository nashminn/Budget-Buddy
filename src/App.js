import logo from './logo.svg';
import './App.css';
import { Layout } from './components/Layout';

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Accounts } from './pages/Accounts/Accounts';
import { Budgets } from './pages/Budget/Budgets';
import { Transactions } from './pages/Transactions/Transactions';
import { CalendarPage } from './pages/CalendarPage/CalendarPage';

function App() {
  
  return (
    <div className="App" >

         <Routes>
          <Route path='/' element={ <Home /> }/>
          <Route path='/transactions' element={ <Transactions openSidebar={true}/> }/>
          <Route path='/accounts' element={ <Accounts openSidebar={true}/> }/>
          <Route path='/budgets' element={ <Budgets openSidebar={true}/> }/>
          <Route path='/calendar' element={ <CalendarPage openSidebar={true}/> }/>
         </Routes>

    </div>
  );
}

export default App;
