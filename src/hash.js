// tiny implementation based
// on http://www.cse.yorku.ca/~oz/hash.html#djb2
export const hash = function hash(toHash) {
  let hash = 5381
  let c

  for (let i = 0; i < toHash.length; i++) {
    c = toHash.charCodeAt(i)
    hash = (hash << 5) + hash + c
  }

  return hash
}
