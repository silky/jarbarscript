# jarbarscript

Interpreter for turing-INCOMPLETE subset of javascript (comparison expressions)

pronounciation guide:

https://twitter.com/thoward37/status/575740274560753664

Basically, you can implement expressions, but not assignment, declaration,
functions, or loops. Just < > <= >= == === != !== ! ?: () . and ,

Okay, so you just implemented a very partial javascript interpreter _in javascript_ are you crazy?
what is the point of this?

Maybe, and quite often you want user provided code, but you do not
want to run arbitary untrusted code. This provides a flexible, familiar
syntax for filtering stuff, but does not let a user provided function own you.

All jarbarscript code has predictable execution time, because there are
no loops or recursion!

``` js
eval('foo < bar', {foo: 1, bar: 2}) => true
eval('foo < bar ? 1 : -1', {foo: 1, bar: 2}) => 1
eval('foo.bar', {qux: {bar: 'QUX'}}) => 'QUX'
```

etc,

## License

MIT