import { context } from 'teth/T'
import cestre from 'teth/cestre'
import './footer.fcd'
const state = cestre()
const ctx = context('footer')

ctx.define('cmd: remove-completed-todos',
  state.mutate('todoItems'),
  (msg, todoItems) => [todoItems.filter(item => !item.isCompleted)])
