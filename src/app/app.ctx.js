import { define, send } from 'teth/T'
import { h1 } from 'teth/HTML'
import sistre from 'teth/sistre'
const state = sistre.get()

define('type: app, cmd: init', msg => {
  console.log('init msg:', msg)
  console.log('state:', state)
  send(sistre.didChangePattern)
    .catch(error => {
      console.error('error from sending did change message:', error)
    })
})

// state('todoItems', 'activeRoute')
// , todoItems, activeRoute

define('type: app, cmd: render', msg => {
  console.log('Render message:', msg)
  return h1().content('TEST')
  // console.log('Render message todoItems:', todoItems)
  // console.log('Render message activeRoute:', activeRoute)
})
