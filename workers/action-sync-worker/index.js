const cron = require('node-cron')
const worker = require('./worker')


cron.schedule('*/10 * * * *', () => {
    console.log('CRON job scheduled.')
    worker().then(res => {
        console.log('CRON job successfully finished.')
    }).catch(e => {
        console.log(`Something went wrong with the cron job, err: ${e}`)
    })
});