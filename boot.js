const app = require('./src/config/express')
const { PORT, NODE_ENV } = process.env

app.listen(PORT, () => console.info(`server started on port ${PORT} (${NODE_ENV})`))

module.exports = app