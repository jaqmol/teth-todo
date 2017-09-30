import { define, send } from 'teth/T'
import { div } from 'teth/HTML'
import cestre from 'teth/cestre'
const state = cestre.get()

define('render: app',
  state('todoItems', 'itemEdited'),
  (msg, todoItems, itemEdited) => div('.todoapp').content(
    send.sync({ render: 'header', todoItems }),
    send.sync({ render: 'todo-list', todoItems, itemEdited })
    // send.sync({ render: 'footer', hasItems })
  ))
