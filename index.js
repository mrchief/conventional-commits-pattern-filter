function filter({ commits, field, pattern }) {
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

  return commits.filter(commit => !re.test(commit[field]))
}

module.exports = filter
