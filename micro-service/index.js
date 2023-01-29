import express from 'express'
import expressJwk from 'express-jwt'
import jwksClient from 'jwks-rsa'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(expressJwk.expressjwt({
  secret: jwksClient.expressJwtSecret({
    jwksUri: 'http://localhost:3333/.well-known/jwks.json',
    cache: true,
    rateLimit: true
  }),
  algorithms: ['RS256']
}).unless({ path: ['/'] })
)

app.listen(3334, () => {
  console.log('rodando em http://localhost:3334')
})

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello, this is not a protected route' })
})

app.get('/protected', (req, res) => {
  res.status(200).send({ message: 'Hello, this is a protected route' })
})
