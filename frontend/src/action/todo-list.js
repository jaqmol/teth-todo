import action from '../../../action'

const renderTodoList = action({
  type: 'facade',
  action: 'render-todo-list'
})

const startEditingTodo = action(
  {
    type: 'reduce',
    action: 'start-editing-todo'
  },
  item => ({ item })
)
const editTodo = action(
  {
    type: 'reduce',
    action: 'edit-todo'
  },
  (key, text, event) => ({ key, text, event })
)
const checkTodo = action(
  {
    type: 'reduce',
    action: 'check-todo'
  },
  (id, checked) => ({ id, checked })
)
const checkManyTodos = action(
  {
    type: 'reduce',
    action: 'check-many-todos'
  },
  checked => ({ checked })
)
const removeTodo = action(
  {
    type: 'reduce',
    action: 'remove-todo'
  },
  id => ({ id })
)

export {
  renderTodoList,
  startEditingTodo,
  editTodo,
  checkTodo,
  checkManyTodos,
  removeTodo
}
