import { define, send } from 'teth/T'
import { div } from 'teth/HTML'
import { renderApp } from '../action/app'
import { renderHeader } from '../action/header'
import { renderFooter } from '../action/footer'
import { renderTodoList } from '../action/todo-list'

define(renderApp.pattern(), () => {
  return div('.todoapp').content(
    send.sync(renderHeader()),
    send.sync(renderTodoList()),
    send.sync(renderFooter())
  )
})
