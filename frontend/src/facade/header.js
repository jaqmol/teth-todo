import { define, context } from 'teth/T'
import { header, h1, input } from 'teth/HTML'
import { renderHeader, createNewTodo } from '../action/header'
import cestre from 'teth/cestre'
const state = cestre()
const ctx = context('header')

define(renderHeader.pattern(),
  state('newItemText'),
  (msg, newItemText) => header('.header').content(
    h1().content('teth todos'),
    input('.new-todo')
      .attrib({placeholder: 'What needs to be done?', autofocus: '1'})
      .prop({value: newItemText})
      .on({keypress: e => {
        ctx.circular(createNewTodo(e.key, e.target.value))
        // ctx.circular({ cmd: 'create-new-todo', key: e.key, text: e.target.value })
      }})
  ))
