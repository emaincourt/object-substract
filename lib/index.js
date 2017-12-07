import find from 'lodash.find'
import isObject from 'lodash.isobject'

export default function substract(source, target) {
  return Object.keys(source).reduce((acc, key) => {
    if (!target[key] || typeof source[key] !== typeof target[key]) {
      return { ...acc, [key]: source[key] }
    }
    if (Array.isArray(source[key])) {
      return {
        ...acc,
        [key]: source[key].reduce(
          (arr, item) =>
            (find(target[key], item) || target[key].includes(item)
            ? arr
            : [...arr, item]),
          [],
        ),
      }
    }
    if (isObject(source[key])) {
      return { ...acc, [key]: substract(source[key], target[key]) }
    }
    if(source[key] !== target[key]) {
      return { ...acc, [key]: source[key] }
    }
    return acc
  }, {})
}