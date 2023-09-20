import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { hash } from '../dist/hash'

test('basic', () => {
  const expectedHash = 6868197425
  const d = hash('some random string')
  assert.equal(d, expectedHash)
})

test.run()
