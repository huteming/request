import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { successData } from '../shared/constants'

export default setupServer(
  rest.get('/status/:status', (req, res, ctx) => {
    const status = Number(req.params.status)
    const message = status === 400 ? null : `status is: ${status}`

    return res(ctx.status(status), ctx.json({ message }))
  }),

  rest.get('/code/:code', (req, res, ctx) => {
    const code = Number(req.params.code)
    const message = code === 400 ? null : `code is: ${code}`

    return res(ctx.json({ code, message }))
  }),

  rest.get('/success', (req, res, ctx) => {
    return res(ctx.json({ data: successData }))
  }),
  rest.delete('/success', (req, res, ctx) => {
    return res(ctx.json({ data: successData }))
  }),
  rest.post('/success', (req, res, ctx) => {
    return res(ctx.json({ data: successData }))
  }),
)
