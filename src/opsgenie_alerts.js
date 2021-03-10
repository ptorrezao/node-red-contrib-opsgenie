module.exports = function (RED) {
    var OG = require('./opsgenie_api.js');

    function OpsGenieAlerts(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.params = RED.nodes.getNode(config.parameters);

        var og = new OG(node.params.apikey, node.params.version, node.params.apihost);

        node.on('input', function (msg) {
            msg.payload = node.params.apihost;

            try {
                og.getAlerts().then((aResult) => {
                    if (aResult.success) {
                        aResult.body.data.forEach(element => {
                            node.send({
                                event_type: "OpsGenie Alert",
                                topic: "OpsGenie Alert",
                                payload: element.message,
                                data: element
                            });
                        });
                    } else {
                        node.error("There was a problem reading an Opsgenie alerts: '" + aResult.error + "' - " + JSON.stringify(aResult.body));
                    }
                });

            } catch (error) {
                node.error("There was a problem reading an Opsgenie alerts: '" + error.message + "'");
            }
        });

    }
    RED.nodes.registerType("OpsgenieAlerts", OpsGenieAlerts);
}