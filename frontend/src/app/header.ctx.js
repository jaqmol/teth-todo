import { context } from 'teth/T'
import './header.fcd'
import auid from 'teth/auid'
import cestre from 'teth/cestre'
import remote from 'teth/remote'
const state = cestre()
const ctx = context('header')

ctx.define('cmd: create-new-todo',
  state.mutate('newItemText'),
  (msg) => [msg.text])

ctx.define('cmd: create-new-todo, key: Enter',
  state.mutate('todoItems', 'newItemText'),
  (msg, todoItems) => {
    const newTodoItem = {
      text: msg.text,
      isCompleted: false,
      id: auid()
    }
    remote({add: 'todo-item', item: newTodoItem}).catch(console.error)
    const todoItemsReplacement = [...todoItems, newTodoItem ]
    const newItemTextReplacement = ''
    return [todoItemsReplacement, newItemTextReplacement]
  })
