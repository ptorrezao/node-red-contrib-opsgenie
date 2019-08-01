module.exports = function(RED) {
    function OpsgenieConfigNode(n) {
        RED.nodes.createNode(this,n);
        this.apihost = n.apihost;
        this.version = n.version;
        this.apikey = n.apikey;
    }
    RED.nodes.registerType("opsgenie-config",OpsgenieConfigNode);
}