const core = require("@actions/core");
const axios = require('axios');

async function run() {
    try {

        const client = axios.create({
            baseURL: core.getInput('baseUrl')
        });

        const response = await client.post('/auth', {
            Username: core.getInput('username'),
            Password: core.getInput('password')
        });

        core.debug(JSON.stringify(response));
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()