const http = require('http')
const PORT = 3030
const valet = require('teth/valet')
const { define } = require('teth/T')
const auid = require('teth/auid')
const pipe = require('teth/pipe')
const { environment } = require('teth-storage')

const dataPath = './todo-data'
const env = environment({maxDbs: 1, path: dataPath})
const store = env.storage('todos')

http.createServer(valet('/api')).listen(PORT)

define('retrieve: all-todo-items', msg => store.filter(true, () => true).then(kvs => kvs.map(kv => kv.value)))
define('add: todo-item', msg => store.put(msg.item.id, msg.item))
define('update: todo-item', msg => store.put(msg.item.id, msg.item))
define('updateAll: todo-items', msg => pipe.all(msg.allItems.map(item => store.put(item.id, item))))
define('remove: todo-item', msg => store.del(msg.id))

console.log('server running on port:', PORT)
