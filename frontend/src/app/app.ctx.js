// import { define } from 'teth/T'
import route from 'teth/route'
import cestre from 'teth/cestre'
import pipe from 'teth/pipe'
import { define } from 'teth/T'
import remote from 'teth/remote'
const state = cestre()

import './header.ctx'
import './todo-list.ctx'
import './footer.ctx'
import './app.fcd'

const mutateRoute = state.mutate('activeRoute')
const base = route('/#', mutateRoute, () => ['all'])
base.route('/active', mutateRoute, () => ['active'])
base.route('/completed', mutateRoute, () => ['completed'])

define('init: app', state.mutate('todoItems'), msg => {
  return remote('retrieve: all-todo-items').then(items => [items])
})
