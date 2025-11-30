import express from 'express'
import personalizeRouter from './routes/personalize.routes'
import docsRouter from './routes/docs.routes'
import menteeRouter from './routes/mentee.routes'
import profileRouter from './routes/profile.routes'

const app = express()
app.use(express.json())

app.use('/personalize', personalizeRouter)
app.use('/docs', docsRouter)
app.use('/mentees', menteeRouter)
app.use('/profiles', profileRouter)

app.listen(3000)