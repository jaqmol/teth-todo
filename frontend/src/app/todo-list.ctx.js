import { context } from 'teth/T'
import cestre from 'teth/cestre'
import './todo-list.fcd'
const ctx = context('todo-list')
const state = cestre()

ctx.define('cmd: start-editing-todo',
  state.mutate('itemEdited'),
  (msg) => [Object.assign({}, msg.item)])

ctx.define('cmd: edit-todo',
  state.mutate('itemEdited'),
  (msg, itemEdited) => {
    itemEdited.text = msg.text
    return [itemEdited]
  })

ctx.define('cmd: edit-todo, key: Enter',
  state.mutate('itemEdited', 'todoItems'),
  (msg, itemEdited, todoItems) => [
    null,
    todoItems.map(item => item.id === itemEdited.id ? itemEdited : item)
  ])

ctx.define('cmd: edit-todo, key: Escape',
  state.mutate('itemEdited'),
  msg => {
    msg.event.preventDefault()
    return [null]
  })

ctx.define('cmd: check-todo',
  state.mutate('todoItems'),
  (msg, todoItems) => [todoItems.map(item => {
    if (item.id === msg.id) {
      console.log('should mark item completed', item)
      item.isCompleted = msg.checked
    }
    return item
  })])

ctx.define('cmd: remove-todo',
  state.mutate('todoItems'),
  (msg, todoItems) => [todoItems.filter(item => item.id !== msg.id)])
