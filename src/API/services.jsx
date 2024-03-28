import React from 'react'

export const getAccountList = () => {
    const accountList = localStorage.getItem('accounts')===null?[]: JSON.parse( localStorage.getItem('accounts') )

    return accountList
}
