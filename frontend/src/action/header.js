import action from '../../../action'

const renderHeader = action({
  type: 'facade',
  action: 'render-header'
})

const createNewTodo = action(
  { type: 'reduce', action: 'create-new-todo' },
  (key, text) => ({ key, text })
)

export { renderHeader, createNewTodo }
