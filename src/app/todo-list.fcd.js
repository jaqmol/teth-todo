import { define, send, context } from 'teth/T'
import { li, section, input, label, ul, div, button } from 'teth/HTML'
const ctx = context.get('todo-list')

define('render: todo-list', msg => section('.main')
  .class('hidden', msg.todoItems.length > 0)
  .content(
    input('#toggle-all.toggle-all')
      .attrib({type: 'checkbox'})
      .on({change: e => {
        send({ type: 'check', cmd: 'complete-all', value: e.target.checked })
      }}),
    label().attrib({for: 'toggle-all'}).content('Mark all as complete'),
    ul('.todo-list').content(
      msg.todoItems.map(item => li()
        .class({
          completed: item.isCompleted,
          editing: msg.itemEdited && (item.id === msg.itemEdited.id)
        }) // hidden: comp.itemIsHiddenAtRoute(item), editing: item.editing
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
