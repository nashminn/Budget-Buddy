import React, { useEffect, useRef, useState } from 'react'
import { Layout } from '../../components/Layout'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'
import { Fab, Grid } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { TransactionModal } from '../Transactions/TransactionModal';
import { getTransactionListByMonth } from '../../API/services';
import { TransactionCard } from '../Transactions/TransactionCard';

export const CalendarPage = ( {openSidebar} ) => {
  const [value, setValue] = useState(new Date());
  
  const [dayFlag, setDayFlag] = useState(false)

  const [currMonthTransactions, setCurrMonthTransactions] = useState([])
  const [currDayTransactions, setCurrDayTransactions] = useState([])

  
  const calendarRef = useRef(null);

  const [openModal, setOpenModal] = useState(false)
  const [modalType, setModalType] = useState(1)
  const [resetCounter, setResetCounter] = useState(0)

  useEffect(()=> {
    const transList = getTransactionListByMonth(new Date())
    console.log(transList)
    setCurrMonthTransactions(transList)
  }, [])

  useEffect(()=>{
    setCurrMonthTransactions(getTransactionListByMonth(value))
    setDayFlag(false)
  }, [resetCounter])

  useEffect(() => {
    
  }, [dayFlag])

  const hasEvent = (date) => {
    const found = currMonthTransactions.filter((x)=>{
      const transDate = new Date(x.date)
      return (transDate.getFullYear() === date.getFullYear() &&
              transDate.getMonth() === date.getMonth() &&
              transDate.getDate() === date.getDate() )
    })

    return found.length > 0
  };

  // red / green dot for days with transactions
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      if (hasEvent(date)) {
        return <div >
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'red' }}></div>
      </div>; 
      }
    }
    return null; // no dot
  };

  const isSameDay = (d1, d2) => {
    return ( d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate() )
  }

  const tileClassName = ({ date }) => {
    // Check if the date is Friday or Saturday
    if (date.getDay() === 5 || date.getDay() === 6) {
      return 'weekend'; 
    }
    return null;
  }

  const handleViewChange = ({ activeStartDate, view }) => {
    setValue(activeStartDate)
    setDayFlag(false)
    
    setCurrDayTransactions([])
    setCurrMonthTransactions(getTransactionListByMonth(activeStartDate))
    setResetCounter(resetCounter + 1)
  }

  const handleDayClick = (date) => {
    console.log(date)
    console.log(currMonthTransactions)
    const filtered = currMonthTransactions.filter((t) => {
      const d = new Date(t.date)
      console.log(isSameDay(date, d))
      return isSameDay(date, d)
    })
    console.log(filtered)
    setDayFlag(true)
    setCurrDayTransactions(filtered)
  }

  return (
    <Layout title="Calendar" openSidebar={openSidebar}>
      <div>
        <div ref={calendarRef} className='custom-calendar-wrapper'>
          <Calendar className='custom-calendar' tileContent={tileContent} value={value}
              tileClassName={tileClassName} locale="en-US" onActiveStartDateChange={handleViewChange}
              onClickDay={handleDayClick} 
            />
        </div>

          <Grid item xs={12} lg={8}>
          {
            dayFlag ? (
              currDayTransactions.map((t, index) => (
                <TransactionCard
                  transaction={t}
                  key={t.id}
                  resetCounter={resetCounter}
                  setResetCounter={setResetCounter}
                />
              ))
            ) : (
              currMonthTransactions.map((t, index) => (
                <TransactionCard
                  transaction={t}
                  key={t.id}
                  resetCounter={resetCounter}
                  setResetCounter={setResetCounter}
                />
              ))
            )
          }

                
          </Grid>
      </div>
    
      <TransactionModal openModal={openModal} setOpenModal={setOpenModal} modalType={modalType} openSidebar={openSidebar} resetCounter={resetCounter} setResetCounter={setResetCounter} />
      <Fab style={{ position: 'fixed', top: 100, right: 20, backgroundColor: '	#90EE90' }}
        onClick={() => { setOpenModal(true); setModalType(1) }} ><Add /></Fab>
      <Fab style={{ position: 'fixed', top: 180, right: 20, backgroundColor: '#FF5C5C' }}
        onClick={() => { setOpenModal(true); setModalType(-1) }}><Remove /></Fab>
    </Layout>
  )
}
