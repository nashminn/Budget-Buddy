import React from 'react'

export const getAccountList = () => {
    const accountList = localStorage.getItem('accounts')===null?[]: JSON.parse( localStorage.getItem('accounts') )

    return accountList;
}

export const getTransactionList = () => {
    const transactionList = localStorage.getItem('transactions')===null?[]: JSON.parse( localStorage.getItem('transactions') )

    return transactionList;
}

export const addNewAccount = (accountToAdd) => {
    const accList = getAccountList()
    const newList = [accountToAdd, ...accList]
    localStorage.setItem("accounts", JSON.stringify(newList))
}

export const addNewTransaction = (transactionToAdd)=>{
    const transactionList = getTransactionList();
    const newList = [transactionToAdd, ...transactionList]

    const acc = getAccountWithTag(transactionToAdd.tag)
    if(transactionToAdd.type === -1) {
        // spending
        acc.balance = Number(acc.balance) - Number(transactionToAdd.amount)
    } else {
        // receiving:D
        acc.balance = Number(acc.balance) + Number(transactionToAdd.amount)
    }
    // console.log(acc)
    const updated = {
        updated: new Date(),
        ...acc
    }

    updateAccount(updated)
    localStorage.setItem( "transactions", JSON.stringify(newList) );
}

const getAccountWithTag = (tag) => {
    const accList = getAccountList()

    let withTag = accList.filter((x)=>{
        return x.tag === tag
    })
    withTag = withTag[0]
    return withTag
}

export const updateAccount = (updatedAccount) => {
    const accList = getAccountList()

    const filtered = accList.filter((x) => {
        return x.id !== updatedAccount.id
    })

    const newAccList = [updatedAccount, ...filtered]
    localStorage.setItem("accounts", JSON.stringify(newAccList) )
}

export const deleteAccount = (deleteId) => {
    const accList = getAccountList()
    const transList = getTransactionList()

    let toDel 
    const without = accList.filter((x)=>{
        if(x.id === deleteId) toDel = x
        return x.id !== deleteId
    })
    const tag = toDel.tag
    
    var k = 0
    
    for(const ta in transList) {
        if(tag === transList[ta].tag) {
            k = k + 1
            deleteTransaction(transList[ta].id)
        }
    }
    
    localStorage.setItem("accounts", JSON.stringify(without) )
}

export const deleteTransaction = (id) => {
    const transList = getTransactionList()
    let withId
    const withoutId = transList.filter((x)=>{
        if(x.id === id) withId = x
        return x.id !== id
    })

    const acc = getAccountWithTag(withId.tag)
    if(withId.type === -1) {
        // refund?
        acc.balance = Number(acc.balance) + Number(withId.amount)
    } else {
        // wrong salary issue idk
        acc.balance = Number(acc.balance) - Number(withId.amount)
    }
    console.log(acc)
    const updated = {
        updated: new Date(),
        ...acc
    }

    updateAccount(updated)
    localStorage.setItem('transactions', JSON.stringify(withoutId))
}
