import { promisify } from 'es6-promisify'
import Session from '../models/Session'
import router from '../helpers/router'
import opentok from '../helpers/opentok'

const getSession = async users => {
    return await Session.findOne({ 
        $or: [
            { user_one: users[0], user_two: users[1] }, 
            { user_one: users[1], user_two: users[0] }
        ]
    })
}

const checkIfSessionExistsAndReturn = async users => {
    let session = getSession(users)

    return session? session: false
}

const assignSession = async users => {
    const sessionCreator = promisify(opentok.createSession.bind(opentok))
    let opentoksession
    let session
    
    if(session = await checkIfSessionExistsAndReturn(users)) {
        return session
    } else {
        opentoksession = await sessionCreator()

        if(opentoksession.err) 
            return { error: opentoksession.err }

        session = { user_one: users[0], user_two: users[1], opentok_session_id: opentoksession.sessionId }
        const newSession = new Session(session)
        await newSession.save()

        return session
    }
}


router.get('/get_token/:user_one/:user_two', async (req, res) => {
    const users = [req.params.user_one, req.params.user_two]
    const session = await assignSession(users)
    const token = await opentok.generateToken(session.opentok_session_id)

    if(token)
        res.status(200).json({ token, session: session.opentok_session_id }).end()
    else
        res.status(500).end()
})

export default router
