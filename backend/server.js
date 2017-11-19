const http = require('http')
const PORT = 3030
const valet = require('teth/valet')
const { define } = require('teth/T')
const auid = require('teth/auid')
const pipe = require('teth/pipe')
const { environment } = require('teth-storage')
const {
  retrieveAllTodoItems,
  insertNewTodoItem,
  updateTodoItem,
  updateManyTodoItems,
  removeTodoItem,
  removeManyTodoItems
} = require('./actions')

const dataPath = './todo-data'
const env = environment({maxDbs: 1, path: dataPath})
const store = env.storage('todos')

http.createServer(valet('/api')).listen(PORT)

define(retrieveAllTodoItems.pattern(), msg => {
  return store.filter(true, () => true).then(kvs => kvs.map(kv => kv.value))
})
define(insertNewTodoItem.pattern(), msg => store.put(msg.item.id, msg.item))
define(updateTodoItem.pattern(), msg => store.put(msg.item.id, msg.item))
define(updateManyTodoItems.pattern(), msg => pipe.all(msg.allItems.map(item => store.put(item.id, item))))
define(removeTodoItem.pattern(), msg => store.del(msg.id))
define(removeManyTodoItems.pattern(), msg => pipe.all(msg.allIds.map(id => store.del(id))))

console.log('server running on port:', PORT)
