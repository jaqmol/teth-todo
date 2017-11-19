import { context } from 'teth/T'
import '../facade/header'
import auid from 'teth/auid'
import cestre from 'teth/cestre'
import remote from 'teth/remote'
import { createNewTodo } from '../action/header'
import { insertNewTodoItem } from '../../../backend/actions'
const state = cestre()
const ctx = context('header')

ctx.define(createNewTodo.pattern(),
  state.mutate('newItemText'),
  (msg) => [msg.text])

ctx.define(createNewTodo.pattern({ key: 'Enter' }),
  state.mutate('todoItems', 'newItemText'),
  (msg, todoItems) => {
    const newTodoItem = {
      text: msg.text,
      isCompleted: false,
      id: auid()
    }
    remote(insertNewTodoItem(newTodoItem)).catch(console.error) // {add: 'todo-item', item: newTodoItem}
    const todoItemsReplacement = [...todoItems, newTodoItem ]
    const newItemTextReplacement = ''
    return [todoItemsReplacement, newItemTextReplacement]
  })
