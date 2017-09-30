import { define, context } from 'teth/T'
import { header, h1, input } from 'teth/HTML'
import cestre from 'teth/cestre'
const state = cestre.get()
const ctx = context.get('header')

define('render: header',
  state('newItemText'),
  (msg, newItemText) => header('.header').content(
    h1().content('teth todos'),
    input('.new-todo')
      .attrib({placeholder: 'What needs to be done?', autofocus: '1'})
      .prop({value: newItemText})
      .on({keypress: e => {
        ctx.circular({ cmd: 'create-new-todo', key: e.key, text: e.target.value })
      }})
  ))
