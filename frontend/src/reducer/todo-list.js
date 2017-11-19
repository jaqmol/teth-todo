import { context } from 'teth/T'
import cestre from 'teth/cestre'
import remote from 'teth/remote'
import { updateTodoItem, updateManyTodoItems, removeTodoItem } from '../../../backend/actions'
import {
  startEditingTodo,
  editTodo,
  checkTodo,
  checkManyTodos,
  removeTodo
} from '../action/todo-list'
const ctx = context('todo-list')
const state = cestre()

ctx.define(startEditingTodo.pattern(),
  state.mutate('itemEdited'),
  (msg) => [Object.assign({}, msg.item)])

ctx.define(editTodo.pattern(),
  state.mutate('itemEdited'),
  (msg, itemEdited) => {
    itemEdited.text = msg.text
    return [itemEdited]
  })

ctx.define(editTodo.pattern({ key: 'Enter' }),
  state.mutate('itemEdited', 'todoItems'),
  (msg, itemEdited, todoItems) => {
    remote(updateTodoItem(itemEdited)).catch(console.error)
    return [
      null,
      todoItems.map(item => item.id === itemEdited.id ? itemEdited : item)
    ]
  })

ctx.define(editTodo.pattern({ key: 'Escape' }),
  state.mutate('itemEdited'),
  msg => {
    msg.event.preventDefault()
    return [null]
  })

ctx.define(checkTodo.pattern(),
  state.mutate('todoItems'),
  (msg, todoItems) => [todoItems.map(item => {
    if (item.id === msg.id) {
      item.isCompleted = msg.checked
      remote(updateTodoItem(item)).catch(console.error)
    }
    return item
  })])

ctx.define(checkManyTodos.pattern(),
  state.mutate('todoItems'),
  (msg, todoItems) => {
    const allItems = todoItems.map(item => {
      item.isCompleted = msg.checked
      return item
    })
    remote(updateManyTodoItems(allItems)).catch(console.error)
    return [allItems]
  })

ctx.define(removeTodo.pattern(),
  state.mutate('todoItems'),
  (msg, todoItems) => {
    remote(removeTodoItem(msg.id)).catch(console.error)
    return [todoItems.filter(item => item.id !== msg.id)]
  })
