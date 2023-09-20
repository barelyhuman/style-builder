import { minify as minifier } from 'csso'

import { hash } from './hash'

let elementCreator
let styleMap = new Map()
let minify = true

let BASE_VARIANT = Symbol.for('base')

/**
 * @param {any} h
 */
export function setup(h) {
  elementCreator = h
  return
}

export function extractStyles() {
  let all = ``
  for (let entry of styleMap.entries()) all += `${entry[1]}`

  return all
}

export function styled(tagName) {
  const variantStyles = {}

  function component({ ...props }) {
    const { styles, className } = compose(props, variantStyles)

    styleMap.set(className, styles)

    const classList = [className]
      .concat(props.class, props.className)
      .filter(Boolean)
      .join(' ')
      .trim()

    return elementCreator(tagName, {
      ...props,
      className: classList,
    })
  }

  function variant(variantName) {
    return function (tag, ...values) {
      const styleGenerator = constructStyleTemplate(tag, values)
      variantStyles[variantName] = styleGenerator
      return api
    }
  }

  const api = {}

  api.component = component
  api.base = variant(BASE_VARIANT)
  api.hover = variant(':hover')
  api.focus = variant(':focus')
  api.variant = variant

  return api
}

function constructStyleTemplate(tags, values) {
  return props => {
    return `
     ${tags.map((x, i) => {
       const hasPartial = values[i]
       if (hasPartial && typeof hasPartial === 'function')
         return `${x}${hasPartial(props)}`
       else return `${x}`
     })} 
    `
  }
}

function compose(props, attributeStyles) {
  let overAllStyle = ``
  let actualStyleTemplate = ``

  if (attributeStyles[BASE_VARIANT]) {
    const out = attributeStyles[BASE_VARIANT](props)
    if (out) overAllStyle += out
    actualStyleTemplate = `.%%classname%%{${out}}`
  }

  Object.keys(attributeStyles).forEach(x => {
    const out = attributeStyles[x](props)
    if (out) {
      overAllStyle += out
      actualStyleTemplate += `.%%classname%%${x}{${out}}`
    }
  })

  const classId = `styl_${hash(overAllStyle)}`

  actualStyleTemplate = actualStyleTemplate.replace(
    /(\%\%classname\%\%)/g,
    classId
  )

  if (minify) actualStyleTemplate = minifier(actualStyleTemplate).css

  return {
    className: classId,
    styles: actualStyleTemplate,
  }
}
