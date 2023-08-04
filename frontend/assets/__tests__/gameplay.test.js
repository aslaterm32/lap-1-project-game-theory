const { page, handleButtonPressed, getMarketMove } = require('../gameplay.js')
const { fireEvent } = require("@testing-library/dom");

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
    
})