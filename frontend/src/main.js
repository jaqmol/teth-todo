import { send } from 'teth/T'
import cestre from 'teth/cestre'
import auid from 'teth/auid'
import init from 'teth/init'
import 'style-loader!css-loader!./theme/todo-mvc.css'
import './theme/theme.scss'

import { initApp, renderApp } from './action/app'

import './facade/app'
import './facade/header'
import './facade/todo-list'
import './facade/footer'

import './reducer/app'
import './reducer/header'
import './reducer/todo-list'
import './reducer/footer'

import remote from 'teth/remote'

remote.init('/api')

init({
  renderPattern: renderApp.pattern(),
  state: {
    activeRoute: 'all',
    newItemText: '',
    itemEdited: null,
    todoItems: []
  },
  selector: '.todoapp'
})

document.addEventListener('DOMContentLoaded', () => {
  send(initApp())
    .catch(console.error)
})
