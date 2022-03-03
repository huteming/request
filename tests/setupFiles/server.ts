import { rest } from 'msw'
import { setupServer } from 'msw/node'

export const successData = { something: 1 }

export default setupServer(
  rest.get('/status/400', (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({ code: 400, message: 'error: status 400' }),
    )
  }),
  rest.get('/status/401', (req, res, ctx) => {
    return res(ctx.status(401))
  }),
  rest.get('/status/402', (req, res, ctx) => {
    return res(ctx.status(402))
  }),
  rest.get('/status/403', (req, res, ctx) => {
    return res(ctx.status(403))
  }),
  rest.get('/status/404', (req, res, ctx) => {
    return res(ctx.status(404))
  }),
  rest.get('/status/405', (req, res, ctx) => {
    return res(ctx.status(405))
  }),
  rest.get('/status/500', (req, res, ctx) => {
    return res(ctx.status(500))
  }),

  rest.get('/code/0', (req, res, ctx) => {
    return res(ctx.json({ code: 0, message: 'error: code 0' }))
  }),
  rest.get('/code/200', (req, res, ctx) => {
    return res(ctx.json({ code: 200, message: 'error: code 200' }))
  }),
  rest.get('/code/400', (req, res, ctx) => {
    return res(ctx.json({ code: 400, message: 'error: code 400' }))
  }),
  rest.get('/code/401', (req, res, ctx) => {
    return res(ctx.json({ code: 401, message: 'error: code 401' }))
  }),
  rest.get('/code/402', (req, res, ctx) => {
    return res(ctx.json({ code: 402, message: 'error: code 402' }))
  }),
  rest.get('/code/403', (req, res, ctx) => {
    return res(ctx.json({ code: 403, message: 'error: code 403' }))
  }),
  rest.get('/code/404', (req, res, ctx) => {
    return res(ctx.json({ code: 404, message: 'error: code 404' }))
  }),
  rest.get('/code/405', (req, res, ctx) => {
    return res(ctx.json({ code: 405, message: 'error: code 405' }))
  }),
  rest.get('/code/500', (req, res, ctx) => {
    return res(ctx.json({ code: 500, message: 'error: code 500' }))
  }),
  rest.get('/code/600', (req, res, ctx) => {
    return res(ctx.json({ code: 600, message: 'error: code 600' }))
  }),

  rest.get('/success', (req, res, ctx) => {
    return res(ctx.json({ code: 200, data: successData }))
  }),
  rest.post('/success', (req, res, ctx) => {
    return res(ctx.json({ code: 200, data: successData }))
  }),
  rest.put('/success', (req, res, ctx) => {
    return res(ctx.json({ code: 200, data: successData }))
  }),
  rest.delete('/success', (req, res, ctx) => {
    return res(ctx.json({ code: 200, data: successData }))
  }),

  rest.get('/error/code/noMessage', (req, res, ctx) => {
    return res(ctx.json({ code: 600 }))
  }),
  rest.get('/error/status/noMessage', (req, res, ctx) => {
    return res(ctx.status(400))
  }),
)
