// import { define } from 'teth/T'
import route from 'teth/route'
import cestre from 'teth/cestre'
const state = cestre()

import './header.ctx'
import './todo-list.ctx'
import './footer.ctx'
import './app.fcd'

const mutateRoute = state.mutate('activeRoute')
const base = route('/#', mutateRoute, () => ['all'])
base.route('/active', mutateRoute, () => ['active'])
base.route('/completed', mutateRoute, () => ['completed'])
