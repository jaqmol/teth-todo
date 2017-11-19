import action from '../../../action'

const renderApp = action({
  type: 'facade',
  action: 'render-app'
})

const initApp = action({
  type: 'reduce',
  action: 'init-app'
})

export { renderApp, initApp }
