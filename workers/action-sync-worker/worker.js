const axios = require('axios')
const LITTLEFISH_API_URL = "https://api.littlefish.foundation"
const HARD_LIMIT = 100 // only at this phase

const getActions = async (page,limit) => {
    const options = {
        method: 'GET',
        url: `${LITTLEFISH_API_URL}/action`,
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            page,
            limit,
        }
    };
    let response
    try {
        response = await axios.request(options)
    } catch(e) {
        console.log(`${e?.message} has occurred, err: ${e}`)
    }

    return response.data
}


const syncAction = async (actionID) => {
    const options = {
        method: 'PATCH',
        url: `${LITTLEFISH_API_URL}/action/${actionID}/sync-status`,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let response
    try {
        response = await axios.request(options)
        console.log(response.data)
    } catch(e) {
        console.log(`${e?.message} has occurred, err: ${e}`)
    }
}

const worker = async () => {
    let page = 0, limit = 10;
    let shouldContinue = true;
    let i = 0;
    while (shouldContinue && i < HARD_LIMIT) {
        i++
        const actions = await getActions(page, limit)
        if(actions.length === 0) {
            shouldContinue = false;
            break;
        }
        const promises = []
        actions.forEach(action => {
            promises.push(syncAction(action._id))
        })
        await Promise.all(promises)
        page++;
    }
    return true;
}

module.exports = worker
