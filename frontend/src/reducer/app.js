// import { define } from 'teth/T'
import route from 'teth/route'
import cestre from 'teth/cestre'
import { define } from 'teth/T'
import remote from 'teth/remote'
import { initApp } from '../action/app'
import { retrieveAllTodoItems } from '../../../backend/actions'
const state = cestre()

const mutateRoute = state.mutate('activeRoute')
const base = route('/#', mutateRoute, () => ['all'])
base.route('/active', mutateRoute, () => ['active'])
base.route('/completed', mutateRoute, () => ['completed'])

const mutateTodoItems = state.mutate('todoItems')
define(initApp.pattern(), mutateTodoItems, msg => {
  return remote(retrieveAllTodoItems()).then(items => [items])
})
