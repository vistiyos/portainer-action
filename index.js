const core = require("@actions/core");
const axios = require('axios');

async function run() {
    try {

        const endpoint = core.getInput('endpoint');

        const client = axios.create({
            baseURL: `${core.getInput('baseUrl')}/api`
        });

        const response = await client.post('/auth', {
            Username: core.getInput('username'),
            Password: core.getInput('password')
        });

        const token = response.data.jwt;

        await client.post(`/endpoints/${endpoint}/docker/containers/create`, {
            Image: core.getInput('dockerImage')
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        core.debug(token);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()