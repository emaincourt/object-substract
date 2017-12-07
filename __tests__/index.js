import substract from '../lib'

describe('single-level depth', () => {
  it('it should substract an object to another', () => {
    const source = { foo: 'foo', bar: 'bar' }
    expect(substract(source, source)).toMatchObject({})
  })

  it('should ignore keys that do not exist in the target object', () => {
    const source = { foo: 'foo', bar: 'bar' }
    const target = { bar: 'bar' }
    expect(substract(source, target)).toMatchObject({
      foo: 'foo',
    })
  })

  it('should ignore fields that do not have the same value', () => {
    const source = { foo: 'foo', bar: 'bar' }
    const target = { bar: 'foo' }
    expect(substract(source, target)).toMatchObject({
      foo: 'foo',
      bar: 'bar',
    })
  })
})

describe('nth-level depth', () => {
  it('it should substract an object to another', () => {
    const source = {
      foo: {
        foo: {
          foo: 'foo',
          bar: 'bar',
        }
      },
    }
    const target = {
      foo: {
        foo: {
          foo: 'foo',
        }
      },
    } 
    expect(substract(source, target)).toMatchObject({
      foo: {
        foo: {
          bar: 'bar',
        }
      },
    })
  })

  it('should ignore keys that do not exist in the target object', () => {
    const source = {
      foo: {
        foo: {
          foo: 'foo',
          bar: 'bar',
        }
      },
    }
    const target = {
      foo: {
        foo: {
          foo: 'foo',
          foobar: 'foobar',
        }
      },
    } 
    expect(substract(source, target)).toMatchObject({
      foo: {
        foo: {
          bar: 'bar',
        }
      },
    })
  })
})

describe('nested arrays', () => {
  it("should remove items from an array if it dosen't exist at any index whatever", () => {
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
    expect(substract(source, target)).toMatchObject({
      foo: [
        { bar: 'bar' },
      ],
    })
  })
})