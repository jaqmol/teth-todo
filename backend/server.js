const http = require('http')
const PORT = 3030
const valet = require('teth/valet')
const { define } = require('teth/T')
const auid = require('teth/auid')
let allTodoItems = null

http.createServer(valet('/api')).listen(PORT)

define('retrieve: all-todo-items', msg => {
  return allTodoItems
})
define('add: todo-item', msg => {
  allTodoItems = [...allTodoItems, msg.item]
})
define('update: todo-item', msg => {
  allTodoItems = allTodoItems.map(item => item.id === msg.item.id ? msg.item : item)
})
define('remove: todo-item', msg => {
  allTodoItems = allTodoItems.filter(item => item.id !== msg.id)
})

allTodoItems = [
  {
    text: 'buy bananas',
    isCompleted: false,
    id: auid()
  },
  {
    text: 'buy apples',
    isCompleted: false,
    id: auid()
  },
  {
    text: 'buy grapes',
    isCompleted: false,
    id: auid()
  },
  {
    text: 'buy bread',
    isCompleted: false,
    id: auid()
  },
  {
    text: 'buy pasta',
    isCompleted: false,
    id: auid()
  },
  {
    text: 'buy passata',
    isCompleted: false,
    id: auid()
  },
  {
    text: 'buy olive oil',
    isCompleted: false,
    id: auid()
  }
]

console.log('server running on port:', PORT)
