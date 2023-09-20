import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { setup, styled, extractStyles } from '../dist/index.js'
import renderToString from 'preact-render-to-string'
import preact from 'preact'

test.before(() => {
  setup(preact.h)
})

test('basic', () => {
  const d = styled('a').base`background-color:red;`.hover`background-color:blue`
    .component

  const expectedOutput = `.styl_38613252407{background-color:red}.styl_38613252407:hover{background-color:#00f}`
  // @ts-expect-error inherit fails
  renderToString(preact.h(d), {})
  assert.equal(extractStyles(), expectedOutput)
})

test.run()
