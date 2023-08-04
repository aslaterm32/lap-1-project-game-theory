const app = require('../index.js')
const results = require('../results.json')
const supertest = require('supertest')
const requestWithSupertest = supertest(app)

describe('/ Endpoint', () => {
    it('GET / exists', async () => {
        const res = await requestWithSupertest.get('/')
        expect(res.status).toEqual(200)
    })
})

describe('/results Endpoint', () => {
    it('GET /results shows all results', async () => {
        const res = await requestWithSupertest.get('/results')
        expect(res.status).toEqual(200)
        expect(res.body).toEqual(results)
    })
    it('POST /results adds a new result', async () => {
        const initialLength = results.length
        const res = await requestWithSupertest.post('/results')
        expect(res.status).toEqual(200)
        expect(JSON.stringify(res.body)).toEqual(JSON.stringify(results[results.length - 1]))
        expect(results.length).toEqual(initialLength + 1)
    })
    it('DELETE /results/:id deletes result with id=id', async () => {
        await requestWithSupertest.post('/results')
        const initialLength = results.length
        const res = await requestWithSupertest.delete('/results/0')
        expect(res.status).toEqual(200)
        expect(res.text).toEqual('Result deleted')
        expect(results.length).toEqual(initialLength - 1)
        expect(results[0].id).toEqual(0)
    })
    it('DELETE /results deletes all results', async () => {
        const res = await requestWithSupertest.delete('/results')
        expect(res.status).toEqual(200)
        expect(res.text).toEqual('Results cleared')
        expect(results.length).toEqual(0)
    })
})
