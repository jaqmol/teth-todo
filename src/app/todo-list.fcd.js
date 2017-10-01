import { define, send, context, match } from 'teth/T'
import { li, section, input, label, ul, div, button } from 'teth/HTML'
import cestre from 'teth/cestre'
const state = cestre.get()
const ctx = context.get('todo-list')
const matchIsHidden = match()
  .define('route: active, completed: true', () => true)
  .define('route: completed, completed: false', () => true)
  .unknown(() => false)

define('render: todo-list',
  state('todoItems', 'itemEdited', 'activeRoute'),
  (msg, todoItems, itemEdited, activeRoute) => section('.main')
    .class('hidden', todoItems.length > 0)
    .content(
      input('#toggle-all.toggle-all')
        .attrib({type: 'checkbox'})
        .on({change: e => {
          send({ type: 'check', cmd: 'complete-all', value: e.target.checked })
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
                ctx.send({ cmd: 'start-editing-todo', item })
              }})
              .content(
                input('.toggle')
                  .attrib({type: 'checkbox', id: item.id})
                  .prop({checked: item.isCompleted})
                  .on({change: e => {
                    ctx.send({cmd: 'check-todo', id: item.id, checked: e.target.checked})
                  }}),
                label().content(item.text),
                button('.destroy').on({click: () => {
                  ctx.send({cmd: 'remove-todo', id: item.id})
                }})),
            input('.edit')
              .attrib({value: item.text})
              .on({keypress: event => {
                ctx.circular({
                  cmd: 'edit-todo',
                  key: event.key,
                  text: event.target.value,
                  event
                })
              }}))
        )
      )
    )
)
