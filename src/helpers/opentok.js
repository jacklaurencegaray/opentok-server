
import OpenTok from 'opentok'

const opentok = new OpenTok(
    process.env.OPENTOK_API_KEY, 
    process.env.OPENTOK_SECRET)

export default opentok
