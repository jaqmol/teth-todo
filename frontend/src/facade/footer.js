import { define, context } from 'teth/T'
import { button, footer, span, strong, ul, li, a } from 'teth/HTML'
import cestre from 'teth/cestre'
import { renderFooter, removeCompletedTodos } from '../action/footer'
const state = cestre()
const footerSend = context('footer').send

define(renderFooter.pattern(),
  state('todoItems', 'activeRoute'),
  (msg, todoItems, activeRoute) => {
    const completedItemsCount = todoItems.reduce((acc, item) => acc + (item.isCompleted ? 1 : 0), 0)
    const uncompletedItemsCount = todoItems.length - completedItemsCount
    const uncompletedItemsLabel = uncompletedItemsCount === 1 ? ' item left' : ' items left'
    return footer('.footer')
      .class({hidden: !todoItems.length})
      .content(
        span('.todo-count').content(
          strong().content(uncompletedItemsCount),
          uncompletedItemsLabel
        ),
        ul('.filters').content(
          li().content(
            a().class({selected: activeRoute === 'all'})
              .attrib({href: '#'})
              .content('All')
          ),
          li().content(
            a().class({selected: activeRoute === 'active'})
              .attrib({href: '#/active'})
              .content('Active')
          ),
          li().content(
            a().class({selected: activeRoute === 'completed'})
              .attrib({href: '#/completed'})
              .content('Completed')
          )
        ),
        button('.clear-completed')
          .class({hidden: completedItemsCount === 0})
          .on({click: () => {
            console.log('Should delete all completed')
            footerSend(removeCompletedTodos())
          }})
          .content('Clear completed')
      )
  })
