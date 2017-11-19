const action = require('../action')

const retrieveAllTodoItems = action({
  type: 'retrieve',
  action: 'all-todo-items'
})

const insertNewTodoItem = action(
  {
    type: 'mutate',
    action: 'insert-new-todo-item'
  },
  item => ({ item })
)

const updateTodoItem = action(
  {
    type: 'mutate',
    action: 'update-todo-item'
  },
  item => ({ item })
)
const updateManyTodoItems = action(
  {
    type: 'mutate',
    action: 'update-many-todo-item'
  },
  allItems => ({ allItems })
)

const removeTodoItem = action(
  {
    type: 'mutate',
    action: 'remove-todo-item'
  },
  id => ({ id })
)
const removeManyTodoItems = action(
  {
    type: 'mutate',
    action: 'remove-many-todo-items'
  },
  allIds => ({ allIds })
)

module.exports = {
  retrieveAllTodoItems,
  insertNewTodoItem,
  updateTodoItem,
  updateManyTodoItems,
  removeTodoItem,
  removeManyTodoItems
}
