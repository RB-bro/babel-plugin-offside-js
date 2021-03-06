require('source-map-support').install()
const {genSyntaxTestCases, standardTransforms} = require('./_xform_syntax_variations')

const tap = require('tap-lite-tester')
tap.start()

genSyntaxTestCases @ tap, iterSyntaxVariations()
if 1 ::
  for let xform of Object.values @ standardTransforms ::
    genSyntaxTestCases @ tap, xform @ iterSyntaxVariations()

tap.finish()


function * iterSyntaxVariations() ::
  yield :: expectValid: true
    , title: 'keyword offside if/else statement, extended multiline'
    , source: @[] 'if cond_a'
                , '    && cond_b ::'
                , '  blockStatement'
                , 'else ::'
                , '  blockStatement'
    , tokens: @[] 'if', '(', 'name', '&&', 'name', ')', '{', 'name', '}', 'else', '{', 'name', '}', 'eof'

  yield :: expectValid: true
    , title: 'v1 keyword offside if/else statement with call, extended multiline'
    , source: @[] 'if cond_a'
                , '    && fn_test @ a, b ::'
                , '  blockStatement'
                , 'else ::'
                , '  blockStatement'
    , tokens: @[] 'if', '(', 'name', '&&', 'name', '(', 'name', ',', 'name', ')', ')', '{', 'name', '}', 'else', '{', 'name', '}', 'eof'

  yield :: expectValid: true
    , title: 'v2 keyword offside if/else statement with call, extended multiline'
    , source: @[] 'if fn_test @ a, b'
                , '    && cond_b ::'
                , '  blockStatement'
                , 'else ::'
                , '  blockStatement'
    , tokens: @[] 'if', '(', 'name', '(', 'name', ',', 'name', ')', '&&', 'name', ')', '{', 'name', '}', 'else', '{', 'name', '}', 'eof'

  yield :: expectValid: true
    , title: 'keyword offside while statement, extended multiline'
    , source: @[] 'while cond_a'
                , '    && cond_b ::'
                , '  blockStatement'
    , tokens: @[] 'while', '(', 'name', '&&', 'name', ')', '{', 'name', '}', 'eof'

  yield :: expectValid: true
    , title: 'keyword offside do/while statement, extended multiline'
    , source: @[] 'do ::'
                , '  blockStatement'
                , 'while cond_a'
                , '   && cond_b'
    , tokens: @[] 'do', '{', 'name', '}', 'while', '(', 'name', '&&', 'name', ')', 'eof'

  yield :: expectValid: true
    , title: 'keyword offside do/while statement with call, extended multiline'
    , source: @[] 'do ::'
                , '  blockStatement'
                , 'while fn_test @ a, b'
                , '   && cond_b'
    , tokens: @[] 'do', '{', 'name', '}', 'while', '(', 'name', '(', 'name', ',', 'name', ')', '&&', 'name', ')', 'eof'

  yield :: expectValid: true
    , title: 'keyword offside switch statement, extended multiline'
    , source: @[] 'switch'
                , '    fn_init @ a, b ::'
                , '  case a: default: blockStatement'
    , tokens: @[] 'switch', '(', 'name', '(', 'name', ',', 'name', ')', ')', '{', 'case', 'name', ':', 'default', ':', 'name', '}', 'eof'

  yield :: expectValid: true
    , title: 'keyword offside for/of let statement, extended multiline'
    , source: @[] 'for let ea of'
                , '      fn_init @ a, b ::'
                , '  blockStatement'
    , tokens: @[] 'for', '(', 'let', 'name', 'name', 'name', '(', 'name', ',', 'name', ')', ')', '{', 'name', '}', 'eof'

  yield :: expectValid: true
    , title: 'keyword offside for/step let statement, extended multiline'
    , source: @[] 'for let i = 0'
                , '    ; i < n'
                , '    ; i++ ::'
                , '  blockStatement'
    , tokens: @[] 'for', '(', 'let', 'name', '=', 'num', ';', 'name', '</>', 'name', ';', 'name', '++/--', ')', '{', 'name', '}', 'eof'

  yield :: expectValid: true
    , title: 'keyword offside for/step let statement, extended multiline'
    , source: @[] 'for let i = fn_init @ a, b'
                , '    ; fn_test @ i, n'
                , '    ; i++ ::'
                , '  blockStatement'
    , tokens: @[] 'for', '(', 'let', 'name', '=', 'name', '(', 'name', ',', 'name', ')', ';', 'name', '(', 'name', ',', 'name', ')', ';', 'name', '++/--', ')', '{', 'name', '}', 'eof'
