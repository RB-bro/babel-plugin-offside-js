const runTests = require('tap-lite-tester/runner')
if (module === require.main) {
  runTests(process.argv.slice(2))
    .catch(err => console.error(err))
}

