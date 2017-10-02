import { context } from 'teth/T'
import './header.fcd'
import auid from 'teth/auid'
import cestre from 'teth/cestre'
const state = cestre()
const ctx = context('header')

ctx.define('cmd: create-new-todo',
  state.mutate('newItemText'),
  (msg) => [msg.text])

ctx.define('cmd: create-new-todo, key: Enter',
  state.mutate('todoItems', 'newItemText'),
  (msg, todoItems) => {
    const todoItemsReplacement = [
      ...todoItems,
      {
        text: msg.text,
        isCompleted: false,
        id: auid()
      }
    ]
    const newItemTextReplacement = ''
    return [todoItemsReplacement, newItemTextReplacement]
  })
