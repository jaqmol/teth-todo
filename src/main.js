// global css
import { send } from 'teth/T'
import auid from 'teth/auid'
import init from 'teth/init'
import 'style-loader!css-loader!./theme/todo-mvc.css'
import './theme/theme.scss'
import './app/app.ctx'

init({
  renderPattern: 'render: app',
  state: {
    activeRoute: '',
    newItemText: '',
    itemEdited: null,
    todoItems: [
      {
        text: 'buy bananas',
        isCompleted: false,
        id: auid()
      },
      {
        text: 'buy apples',
        isCompleted: false,
        id: auid()
      },
      {
        text: 'buy grapes',
        isCompleted: false,
        id: auid()
      },
      {
        text: 'buy bread',
        isCompleted: false,
        id: auid()
      },
      {
        text: 'buy pasta',
        isCompleted: false,
        id: auid()
      },
      {
        text: 'buy passata',
        isCompleted: false,
        id: auid()
      },
      {
        text: 'buy olive oil',
        isCompleted: false,
        id: auid()
      }
    ]
  },
  selector: '.todoapp'
})

document.addEventListener('DOMContentLoaded', () => {
  send('cmd: init-app')
})
