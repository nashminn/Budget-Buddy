import React, { useState } from 'react'
import { Layout } from '../components/Layout'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export const CalendarPage = ( {openSidebar} ) => {
  const [value, setValue] = useState(new Date());

  const hasEvent = (date) => {
    // Check if the date has an associated event in the eventData object
    // Return true if it has, false otherwise
    // You need to implement this function based on your data structure
    // For example:
    // return eventData.hasOwnProperty(date.toISOString().split('T')[0]);
    return true
  };

  // Function to render content for each tile (day)
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      // Check if the date has an event
      if (hasEvent(date)) {
        return <div >
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'red' }}></div>
      </div>; // Render a dot for the date
      }
    }
    return null; // Return null if no dot is needed
  };

  return (
    <Layout title="Calendar" openSidebar={openSidebar}>
      <Calendar tileContent={tileContent}/>
    
    </Layout>
  )
}
