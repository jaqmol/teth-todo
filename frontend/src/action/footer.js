import action from '../../../action'
import { send } from 'teth/T'

const removeCompletedTodos = action({
  type: 'reduce',
  action: 'remove-completed-todos'
})

const renderFooter = action({
  type: 'facade',
  action: 'render-footer'
})

export { removeCompletedTodos, renderFooter }
