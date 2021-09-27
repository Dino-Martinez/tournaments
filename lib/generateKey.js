export default function * generateKey () {
  let count = 0
  while (true) yield count++
}
