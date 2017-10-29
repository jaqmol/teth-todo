import { context } from 'teth/T'
import cestre from 'teth/cestre'
import './todo-list.fcd'
import remote from 'teth/remote'
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
  (msg, itemEdited, todoItems) => {
    remote({update: 'todo-item', item: itemEdited}).catch(console.error)
    return [
      null,
      todoItems.map(item => item.id === itemEdited.id ? itemEdited : item)
    ]
  })

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
      item.isCompleted = msg.checked
      remote({update: 'todo-item', item}).catch(console.error)
    }
    return item
  })])

ctx.define('cmd: complete-all',
  state.mutate('todoItems'),
  (msg, todoItems) => {
    const allItems = todoItems.map(item => {
      item.isCompleted = msg.checked
      return item
    })
    remote({updateAll: 'todo-items', allItems}).catch(console.error)
    return [allItems]
  })

ctx.define('cmd: remove-todo',
  state.mutate('todoItems'),
  (msg, todoItems) => {
    remote({remove: 'todo-item', id: msg.id}).catch(console.error)
    return [todoItems.filter(item => item.id !== msg.id)]
  })
