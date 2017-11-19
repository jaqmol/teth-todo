function composeAction (pattern, callback) {
  pattern = Object.freeze(pattern)
  const actionFn = callback
    ? (...args) => Object.assign({}, pattern, callback(...args))
    : () => pattern
  actionFn.pattern = mergeLit => mergeLit
    ? Object.assign({}, pattern, mergeLit)
    : pattern
  return actionFn
}

module.exports = composeAction
