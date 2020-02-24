// import express, { Request, Response, NextFunction } from 'express'
import express from 'express'

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})


router.get('/hello', (req, res) => {
  res.json({ ok: true })
})

// Add POST - /api/login
// router.post('/login', (req, res) => {
//   if (req.body.username === 'demo' && req.body.password === 'demo') {
//     //@ts-ignore:
//     req.session.authUser = { username: 'demo' }
//     return res.json({ username: 'demo' })
//   }
//   res.status(401).json({ message: 'Bad credentials' })
// })

// Add POST - /api/logout
// router.post('/logout', (req, res) => {
//   //@ts-ignore:
//   delete req.session.authUser
//   res.json({ ok: true })
// })

// Export the server middleware
export default {
  path: '/api',
  handler: router
}



// (req: Request, res: Response, next: NextFunction ) {
//   // proxy.web(req, res, {
//   //   target: API_URL
//   // })
//   res.statusCode = 200
//   res.end()
// }
