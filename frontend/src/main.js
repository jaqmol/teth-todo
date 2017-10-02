import { circular } from 'teth/T'
import cestre from 'teth/cestre'
import auid from 'teth/auid'
import init from 'teth/init'
import 'style-loader!css-loader!./theme/todo-mvc.css'
import './theme/theme.scss'
import './app/app.ctx'

init({
  renderPattern: 'render: app',
  state: {
    activeRoute: 'all',
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
  circular(cestre.didChangePattern)
    .catch(error => {
      console.error('error from sending did change message:', error)
    })
})
