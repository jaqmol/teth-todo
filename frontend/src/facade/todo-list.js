import { define, send, context, match } from 'teth/T'
import { li, section, input, label, ul, div, button } from 'teth/HTML'
import {
  renderTodoList,
  startEditingTodo,
  editTodo,
  checkTodo,
  checkManyTodos,
  removeTodo
} from '../action/todo-list'
import cestre from 'teth/cestre'
const state = cestre()
const ctx = context('todo-list')

const matchIsHidden = match()
  .define('route: active, completed: true', () => true)
  .define('route: completed, completed: false', () => true)
  .unknown(() => false)

define(renderTodoList.pattern(),
  state('todoItems', 'itemEdited', 'activeRoute'),
  (msg, todoItems, itemEdited, activeRoute) => section('.main')
    .class('hidden', todoItems.length > 0)
    .content(
      input('#toggle-all.toggle-all')
        .attrib({type: 'checkbox'})
        .on({change: e => {
          ctx.send(checkManyTodos(e.target.checked))
        }}),
      label().attrib({for: 'toggle-all'}).content('Mark all as complete'),
      ul('.todo-list').content(
        todoItems.map(item => li()
          .class({
            completed: item.isCompleted,
            editing: itemEdited && (item.id === itemEdited.id),
            hidden: matchIsHidden.do({route: activeRoute, completed: item.isCompleted})
          })
          .content(
            div('.view')
              .on({dblclick: () => {
                ctx.send(startEditingTodo(item))
              }})
              .content(
                input('.toggle')
                  .attrib({type: 'checkbox', id: item.id})
                  .prop({checked: item.isCompleted})
                  .on({change: e => {
                    ctx.send(checkTodo(item.id, e.target.checked))
                  }}),
                label().content(item.text),
                button('.destroy').on({click: () => {
                  ctx.send(removeTodo(item.id))
                }})),
            input('.edit')
              .attrib({value: item.text})
              .on({keypress: e => {
                ctx.circular(editTodo(e.key, e.target.value, e))
              }}))
        )
      )
    )
)
