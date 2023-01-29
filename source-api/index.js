import express from 'express'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import pemToJwk from './convertPem.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('source-api/public'))

app.listen(3333, () => {
  console.log('running on http://localhost:3333')
})

app.get('/login', async (req, res) => {
  // all the bureaucracy carried out about login
  const secret  = fs.readFileSync('source-api/keys/private.pem', err => {
    if (err) console.log(err)
  })
  const token = jwt.sign({}, secret, { expiresIn: '1d', algorithm: 'RS256' })
  res.status(200).send({ token })
})

app.get('/pem', async (req, res) => {
  res.status(200).send(pemToJwk())
})