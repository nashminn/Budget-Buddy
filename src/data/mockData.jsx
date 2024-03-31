const accounts = [
    {
      balance: 58464,
      created: '2024-03-31T02:51:42.833Z',
      id: 'account_1',
      initialAmount: 48240,
      name: 'Prime Bank PLC',
      notes: '',
      tag: 'PBP'
    },
    {
      balance: 93603,
      created: '2024-03-31T02:51:42.834Z',
      id: 'account_2',
      initialAmount: 49040,
      name: 'Rocket',
      notes: '',
      tag: 'R'
    },
    {
      balance: 40475,
      created: '2024-03-31T02:51:42.834Z',
      id: 'account_3',
      initialAmount: 33711,
      name: 'EXIM Bank Limited',
      notes: '',
      tag: 'EBL'
    },
    {
      balance: 32488,
      created: '2024-03-31T02:51:42.834Z',
      id: 'account_4',
      initialAmount: 76779,
      name: 'NRB Bank Limited',
      notes: '',
      tag: 'NBL'
    },
    {
      balance: 6721,
      created: '2024-03-31T02:51:42.834Z',
      id: 'account_5',
      initialAmount: 7526,
      name: 'Trust Axiata pay (tap)',
      notes: '',
      tag: 'TAP'
    }
  ]

const transactions = [
    {
      id: '4ao78hnq1',
      type: -1,
      category: 'Eating out',
      amount: 798,
      date: '2024-02-18T22:05:51.442Z',
      tag: 'R',
      notes: ''
    },
    {
      id: 'anicv0qdy',
      type: -1,
      category: 'Other',
      amount: 420,
      date: '2024-01-11T10:31:15.677Z',
      tag: 'R',
      notes: ''
    },
    {
      id: 'n7tnd6w9g',
      type: -1,
      category: 'Family',
      amount: 104,
      date: '2024-01-03T11:49:08.855Z',
      tag: 'EBL',
      notes: ''
    },
    {
      id: 'l31lgfjl3',
      type: 1,
      category: 'Other',
      amount: 604,
      date: '2024-01-27T13:44:15.339Z',
      tag: 'EBL',
      notes: ''
    },
    {
      id: '5o9czjt3g',
      type: 1,
      category: 'Part time pay',
      amount: 214,
      date: '2024-02-15T08:55:32.145Z',
      tag: 'PBP',
      notes: ''
    },
    {
      id: '6kzornner',
      type: -1,
      category: 'Other',
      amount: 713,
      date: '2024-03-28T07:25:18.105Z',
      tag: 'R',
      notes: ''
    },
    {
      id: 'q0yamsvsz',
      type: -1,
      category: 'Insurance',
      amount: 141,
      date: '2023-12-29T03:05:41.441Z',
      tag: 'TAP',
      notes: ''
    },
    {
      id: 'r29wyzl2c',
      type: -1,
      category: 'Technology',
      amount: 893,
      date: '2024-03-02T22:15:35.803Z',
      tag: 'PBP',
      notes: ''
    },
    {
      id: 'hsoswevlk',
      type: -1,
      category: 'Eating out',
      amount: 792,
      date: '2023-12-26T14:11:13.849Z',
      tag: 'R',
      notes: ''
    },
    {
      id: 'hnzmwtn76',
      type: 1,
      category: 'Financial income',
      amount: 949,
      date: '2024-02-03T15:23:58.079Z',
      tag: 'TAP',
      notes: ''
    },
    {
      id: 'vifroes8d',
      type: 1,
      category: 'Financial income',
      amount: 194,
      date: '2024-01-31T22:33:08.198Z',
      tag: 'TAP',
      notes: ''
    },
    {
      id: 'xnm5613c6',
      type: 1,
      category: 'Personal savings',
      amount: 815,
      date: '2024-02-23T08:20:44.193Z',
      tag: 'EBL',
      notes: ''
    },
    {
      id: 'twed92too',
      type: 1,
      category: 'Personal savings',
      amount: 998,
      date: '2024-03-06T12:20:58.543Z',
      tag: 'PBP',
      notes: ''
    },
    {
      id: 'dbx0dlgb1',
      type: -1,
      category: 'Home',
      amount: 250,
      date: '2023-12-05T00:00:33.800Z',
      tag: 'PBP',
      notes: ''
    },
    {
      id: 'tu41f704d',
      type: -1,
      category: 'Eating out',
      amount: 211,
      date: '2023-12-16T02:02:00.201Z',
      tag: 'PBP',
      notes: ''
    }
  ]

  const budget = [
    {
      id: 'hjw0hwuf8',
      category: 'Home',
      amount: '848',
      created: '2024-03-30T09:06:32.723Z'
    },
    {
      id: 'sqbtmonj9',
      category: 'Health',
      amount: '891',
      created: '2024-03-15T17:36:55.532Z'
    },
    {
      id: 'b3kyv96vh',
      category: 'Insurance',
      amount: '786',
      created: '2024-03-07T11:33:50.945Z'
    },
    {
      id: 'fmnxqpcdi',
      category: 'Technology',
      amount: '362',
      created: '2024-03-26T17:43:21.381Z'
    },
    {
      id: 'eskflnava',
      category: 'Other',
      amount: '308',
      created: '2024-03-02T06:55:47.916Z'
    }
  ]
  
  

export const populateMockData = ()=>{
    if(localStorage.getItem('accounts') === null){
        localStorage.setItem('accounts', JSON.stringify(accounts))
        localStorage.setItem('transactions', JSON.stringify(transactions))
        localStorage.setItem('budgets', JSON.stringify(budget))
    }
}