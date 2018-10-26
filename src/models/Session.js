import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
    opentok_session_id: {
        type: String,
        required: 'You need a token to create a new session.',
        unique: 'Token is already taken.'
    },
    user_one: {
        type: String,
        required: 'Receiving user id is required.'
    },
    user_two: {
        type: String,
        required: 'Receiving user id is required.'
    }
})

export default mongoose.model('Session', sessionSchema)
