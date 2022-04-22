'use strict'

// resolution - insert srcset attribute

const visit = require('unist-util-visit')
const path = require('path')

module.exports = resolution

function transform (tree) {

  function visitor (node) {
    const { tagName, properties: { src, srcSet } } = node

    if (tagName !== 'img' || typeof src !== 'string' || srcSet) return

    const { dir, ext, name } = path.parse(src)
    const breakpoints = ['400', '600', '800', '1000', '1200', '1400']

    node.properties.srcSet = breakpoints.map(breakpoint => {
      return path.join(dir, `${name}${ext}?nf_resize=fit&w=${breakpoint} ${breakpoint}w`)
    })
  }

  visit(tree, ['element'], visitor)
}

function resolution () {
  return transform
}
