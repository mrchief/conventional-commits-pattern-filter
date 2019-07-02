function filter({ commits, field, pattern, include = false }) {
  if (!Array.isArray(commits)) {
    throw new TypeError('commits should be an array')
  }

  if (!field) {
    throw new RangeError('field must be defined')
  }

  if (!pattern) {
    throw new RangeError('pattern must be defined')
  }

  const isRegex = Object.prototype.toString.call(pattern) === '[object RegExp]'

  const re = isRegex ? pattern : new RegExp(pattern)
  const fields = Array.isArray(field) ? field : [field]

  return commits.filter(commit => fields.some(f => (include ? re.test(commit[f]) : !re.test(commit[f]))))
}

module.exports = filter
