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
                var data = '';
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

                // resolve(JSON.stringify(options));

                const req = https.request(options, (res) => {
                    res.on('data', (chunk) => {
                        data += chunk;
                    });

                    res.on('end', () => {
                        if ((res.statusCode >= 200) & (res.statusCode < 300)) {
                            //Success
                            var result = {
                                success: true,
                                body: JSON.parse(data)
                            }
                            resolve(result);
                        } else {
                            //Failure
                            var result = {
                                success: false,
                                body: JSON.parse(data),
                                error: res.statusMessage
                            }
                            reject(result);
                        } 
                    });

                    res.on('error', (err) => {
                        var result = {
                            success: false,
                            body: JSON.parse(data),
                            error: err.message
                        }
                        reject(result);
                    });
                });
                req.write(JSON.stringify(body));
                req.end();
            } catch (error) {
                var result = {
                    success: false,
                    body: JSON.parse(data),
                    error: error.message
                }
                reject(result);
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

    async closeAlert(identifier, identifierType, params={}) {
        var result = {};
        try {
            var aQuery = 'alerts/' + identifier + '/close?identifierType=' + identifierType;
            result = await this.sendQuery(aQuery, 'POST', params);
        } catch (error) {
            result = error;
        }
        return result;
    }
}

module.exports = OG;