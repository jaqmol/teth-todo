import { context } from 'teth/T'
import cestre from 'teth/cestre'
import { removeCompletedTodos } from '../action/footer'
import { removeManyTodoItems } from '../../../backend/actions'
import remote from 'teth/remote'

const state = cestre()
const footerDefine = context('footer').define

footerDefine(removeCompletedTodos.pattern(),
  state.mutate('todoItems'),
  (msg, todoItems) => {
    const allIds = todoItems
      .filter(item => item.isCompleted)
      .map(item => item.id)
    remote(removeManyTodoItems(allIds)).catch(console.error)
    return [todoItems.filter(item => !item.isCompleted)]
  })
