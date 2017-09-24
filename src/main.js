// global css
import { send } from 'teth/T'
import init from 'teth/init'
import './theme/theme.scss'
import './app/app.ctx'

init({
  renderPattern: 'type: app, cmd: render',
  state: {
    todoItems: [],
    activeRoute: '',
    itemEdited: null
  },
  selector: '#todo-app'
})

document.addEventListener('DOMContentLoaded', () => {
  send('type: app, cmd: init')
})
