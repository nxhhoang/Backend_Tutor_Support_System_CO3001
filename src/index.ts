import express from 'express'
import personalizeRouter from './routes/personalize.routes'
import docsRouter from './routes/docs.routes'
import menteeRouter from './routes/mentee.routes'
import profileRouter from './routes/profile.routes'
import workloadRouter from './routes/workload.routes'
import topicRouter from './routes/topic.routes'
import sessionRouter from './routes/session.routes'
import reportRouter from './routes/report.routes'
import programRouter from './routes/program.routes'

const app = express()
app.use(express.json())

app.use('/personalize', personalizeRouter)
app.use('/docs', docsRouter)
app.use('/mentees', menteeRouter)
app.use('/profiles', profileRouter)
app.use('/workloads', workloadRouter)
app.use('/topics', topicRouter)
app.use('/reports', reportRouter)
app.use('/sessions', sessionRouter)
app.use('/programs', programRouter)

app.listen(3000)