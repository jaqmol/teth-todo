import { define, send } from 'teth/T'
import { div } from 'teth/HTML'

define('render: app', () => div('.todoapp').content(
  send.sync({ render: 'header' }),
  send.sync({ render: 'todo-list' }),
  send.sync({ render: 'footer' })
))
