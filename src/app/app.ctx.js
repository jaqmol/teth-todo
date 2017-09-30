import { define, circular } from 'teth/T'
import cestre from 'teth/cestre'
import './header.ctx'
import './todo-list.ctx'
import './app.fcd'
const state = cestre.get()

define('cmd: init-app', msg => {
  console.log('init msg:', msg)
  console.log('state:', state)
  circular(cestre.didChangePattern)
    .catch(error => {
      console.error('error from sending did change message:', error)
    })
})
