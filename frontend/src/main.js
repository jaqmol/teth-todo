import { send } from 'teth/T'
import cestre from 'teth/cestre'
import auid from 'teth/auid'
import init from 'teth/init'
import 'style-loader!css-loader!./theme/todo-mvc.css'
import './theme/theme.scss'
import './app/app.ctx'
import remote from 'teth/remote'

remote.init('/api')

init({
  renderPattern: 'render: app',
  state: {
    activeRoute: 'all',
    newItemText: '',
    itemEdited: null,
    todoItems: []
  },
  selector: '.todoapp'
})

document.addEventListener('DOMContentLoaded', () => {
  send('init: app')
})
