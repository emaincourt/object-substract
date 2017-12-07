# object-substract

Lightweight and easy to use tool for deeply removing a subset of fields from an object.

```javascript
import substract from 'object-substract'

const source = {
  foo: [
    { foo: 'foo' },
    { bar: 'bar' },
    0,
  ]
}
const target = {
  foo: [
    { foo: 'foo' },
    0,
  ]
}

console.log(substract(source, target))
/*
{
  foo: [
    { bar: 'bar' },
  ],
}
*/
```