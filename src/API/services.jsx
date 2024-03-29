import React from 'react'

export const getAccountList = () => {
    const accountList = localStorage.getItem('accounts')===null?[]: JSON.parse( localStorage.getItem('accounts') )

    const transactionList = localStorage.getItem('transactions')===null?[]: JSON.parse( localStorage.getItem('transactions') )

    const addNewTransaction = (transactionToAdd)=>{
        const newList = [transactionToAdd, ...transactionList]
        localStorage.setItem( JSON.stringify(newList) )
    }

    return accountList
}
