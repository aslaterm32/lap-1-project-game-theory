const { page, handleButtonPressed, getMarketMove } = require('./gameplay.js')

describe('handleButtonPressed', () => {
    it('To be defined and exported', () => {
        expect(handleButtonPressed).toBeDefined()
    })

    it('Is a function', () => {
        expect(handleButtonPressed instanceof Function).toEqual(true)
    })
})

describe('getMarketMove', () => {
    it('To be defined and exported', () => {
        expect(getMarketMove).toBeDefined()
    })

    it('Is a function', () => {
        expect(getMarketMove instanceof Function).toEqual(true)
    })
    it('Throws an error when passed no values', () => {
        expect(() => getMarketMove()).toThrow('This function requires one argument')
    })

    it('Throws an error when passed one incorrect value', () => {
        expect(() => getMarketMove('red')).toThrow(
            "This function requires either 'random', 'tit-for-tat' or  'alternate'"
        )
    })

    it('Throws an error when passed non-string arguments', () => {
        expect(() => getMarketMove(3)).toThrow('Arguments must be strings!')
    })
})
