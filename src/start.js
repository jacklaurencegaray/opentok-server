import './env'
import app from './app'

app.listen(
    process.env.PORT, 
    () => 
        console.log(`You are running express at port: ${process.env.PORT}`)
)
