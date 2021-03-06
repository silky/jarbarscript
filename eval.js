
module.exports = E//val

var operators = {
  "<": function (a, b) {
    return E(a, this) < E(b, this)
  },
  "<=": function (a, b) {
    return E(a, this) <= E(b, this)
  },
  ">": function (a, b) {
    return E(a, this) > E(b, this)
  },
  ">=": function (a, b) {
    return E(a, this) >= E(b, this)
  },
  "==": function (a, b) {
    return E(a, this) == E(b, this)
  },
  "!==": function (a, b) {
    return E(a, this) !== E(b, this)
  },
  "!=": function (a, b) {
    return E(a, this) !== E(b, this)
  },
  "===": function (a, b) {
    return E(a, this) === E(b, this)
  },
  '&&': function (a, b) {
    return E(a, this) && E(b, this)
  },
  '||': function (a, b) {
    return E(a, this) || E(b, this)
  },
  '?:': function (a, b, c) {
    return E(a, this) ? E(b, this) : E(c, this)
  },
  '!': function (a) {
    return !E(a, this)
  },
  '!!': function (a) {
    return !!E(a, this)
  },
  '$': function (a) {
    return this[a]
  },
  '.': function (a, b) {
    return E(a, this)[E(b, this)]
  },
  '$.': function () {
    var l = arguments.length
    var env = this
    for(var i = 0; i < l; i++)
      env = env[arguments[i]]
    return env
  },
  ',': function () {
    var l = arguments.length
    var last
    for(var i = 0; i < l; i++)
      last= E(arguments[i], this)
    return last
  }
}

var isArray = Array.isArray

//eval
function E(list, env) {
  if(!isArray(list)) return list

  var name = list.shift()
  var op = operators[name]
  if(!op) throw new Error('unknown operator:' + name)
  if(!op.length) //operator takes an arbitary number of args. only [] so far)

  if(op.length && op.length !== list.length)
    throw new Error('operator:'+name + ' expects ' + op.length + ' arguments, but got:' + list.length)

  if(!list.length) throw new Error('operator:'+name + ' must have at least 1 argument')

  return op.apply(env, list)
}

