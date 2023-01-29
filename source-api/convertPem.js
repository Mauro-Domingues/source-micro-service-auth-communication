import fs from 'fs'
import rsaPemToJwk from 'rsa-pem-to-jwk' // Not working. Broken dependency?
import pemJwk from 'pem-jwk'

export default function pemToJwk (){
  const pem = fs.readFileSync('source-api/keys/public.pem', 'ascii')

  // const jwk = rsaPemToJwk(pem, {use: 'sig'}, 'public'); // returns undefined
  const jwk = pemJwk.pem2jwk(pem) // put "use": "sig" manually

  return {
    ...jwk,
    use: "sig"
  }
}