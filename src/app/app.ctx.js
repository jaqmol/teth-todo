import { define } from 'teth/T'
import route from 'teth/route'
import cestre from 'teth/cestre'
const state = cestre.get()

import './header.ctx'
import './todo-list.ctx'
import './footer.ctx'
import './app.fcd'

const root = route('/#', 'route: all-todos')
root.route('/active', 'route: active-todos')
root.route('/completed', 'route: completed-todos')

define('route: all-todos', state.mutate('activeRoute'), () => ['all'])
define('route: active-todos', state.mutate('activeRoute'), () => ['active'])
define('route: completed-todos', state.mutate('activeRoute'), () => ['completed'])
