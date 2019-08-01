class OG {
    constructor(apikey, version='v2', apihost='api.opsgenie.com') {
        this.apikey = apikey;
        this.version = version;
        this.apihost = apihost;

        return this;
    }

    sendQuery(endpoint, method, body) {
        return new Promise((resolve, reject) => {
            try {
                const https = require('https');
                var options = {
                    hostname: this.apihost,
                    path: '/' + this.version + '/' + endpoint,
                    method: method,
                    headers: {
                        'Authorization': 'GenieKey ' + this.apikey,
                        'Content-Type': 'application/json'
                    }
                };
                var data = '';

                
                // resolve(JSON.stringify(options));

                const req = https.request(options, (res) => {
                    res.on('data', (chunk) => {
                        data += chunk;
                    });

                    res.on('end', () => {
                        if (res.statusCode == 200) {
                            resolve(JSON.parse(data));
                        } else {
                            reject({'StatusCode': res.statusCode, 'Message': res.statusMessage});
                        } 
                    });

                    res.on('error', (err) => {
                        reject(err);
                    });
                });
                req.write(JSON.stringify(body));
                req.end();
            } catch (error) {
                reject(error);
            }
        });
    }

    async getAccountInfo() {
        var result = {};
        try {
            result = await this.sendQuery('account', 'GET', {});
        } catch(error) {
            result = error;
        }
        return result;
    }

    async createAlert(params) {
        var result = {};
        try {
            result = await this.sendQuery('alerts', 'POST', params);
        } catch (error) {
            result = error;
        }
        return result;
    }
}

module.exports = OG;