
var tape = require('tape')
var E = require('../eval')

tape('ltgteq', function (t) {

  function y (b) { t.ok(E(b)) }
  function n(b) { t.notOk(E(b)) }

  y(['==', 1, 1])
  y(['!=', 1, 0])
  y(['===', 1, 1])
  y(['!==', 1, 0])

  n(['==', 1, 0])
  n(['!=', 1, 1])
  n(['===', 1, 0])
  n(['!==', 1, 1])

  y(['<=', 1, 1])
  y(['<=', 0, 1])
  y(['>=', 1, 1])
  y(['>=', 1, 0])

  y(['<', 0, 1])
  y(['>', 1, 0])

  n(['<=', 2, 1])
  n(['>=', 1, 2])

  n(['<', 1, 0])
  n(['<', 1, 1])
  n(['>', 0, 1])
  n(['>', 1, 1])

  y(['!==', 1, 0])

  y(['!', false])
  n(['!', true])
  y(['!!', true])
  n(['!!', false])


  t.end()
})

tape('and or if', function (t) {
  function y (b) { t.ok(E(b)) }
  function n(b) { t.notOk(E(b)) }

  y(['&&', true, true])
  n(['&&', true, false])
  n(['&&', false, true])
  n(['&&', false, false])

  y(['||', true, true])
  y(['||', true, false])
  y(['||', false, true])
  n(['||', false, false])

  y(['?:', true, true, false])
  n(['?:', true, false, true])
  y(['?:', false, false, true])
  n(['?:', false, true, false])

  t.end()
})

tape('comma', function (t) {

  t.equal(E([',', 1, 2, 3]), 3)
  t.end()

})

var obj = {
  foo: {bar: 1, baz: 2},
  qux: 3
}

tape('access', function (t) {
  function is (exp, val) {
    t.deepEqual(E(exp, obj), val)
  }


  is(['$', 'qux'], 3)
  is(['.', ['$', 'foo'], 'bar'], 1)
  is(['.', ['$', 'foo'], 'baz'], 2)
  is(['.', ['$', 'foo'], 'qux'], undefined)
  is(['$', 'foo'], {bar: 1, baz: 2})

  t.end()
})

tape('integrate', function (t) {

  t.deepEqual(
    E(['?:', ['<=', 10, 15], ['$', 'qux'], 7], obj),
    3
  )

  t.deepEqual(
    E(['?:', ['>', 10, 15], ['$', 'qux'], 7], obj),
    7
  )

  t.deepEqual(
    E(['?:', ['>', 10, 15], ['$', 'qux'], 7], obj),
    7
  )

  t.end()

})

