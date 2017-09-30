

const renderFooter = (comp, hasItems) => {
  const completedItemsCount = comp.allItems.reduce((acc, item) => acc + (item.completed ? 1 : 0), 0)
  const uncompletedItemsCount = comp.allItems.length - completedItemsCount
  const uncompletedItemsLabel = uncompletedItemsCount === 1 ? ' item left' : ' items left'
  return footer('.footer').class({hidden: !hasItems}).content(
    span('.todo-count').content(strong().content(uncompletedItemsCount), uncompletedItemsLabel),
    ul('.filters').content(
      li().content(
        a().class({selected: comp.route === 'all-todos'})
           .attrib({href: '#/'})
           .content('All')
      ),
      li().content(
        a().class({selected: comp.route === 'active-todos'})
           .attrib({href: '#/active'})
           .content('Active')
      ),
      li().content(
        a().class({selected: comp.route === 'completed-todos'})
           .attrib({href: '#/completed'})
           .content('Completed')
      )
    ),
    button('.clear-completed')
      .class({hidden: completedItemsCount === 0})
      .on({click: () => comp.clearAllCompletedItems()})
      .content('Clear completed')
  )
}
