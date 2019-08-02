// The MIT License (MIT)

// Copyright (c) 2019 Edrean Ernst

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

module.exports = function(RED) {
    var OG = require('./opsgenie_api.js');

    function OpsgenieAlert(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        var og = new OG();

        node.on('input', function(msg) {
            try {
                if (msg.payload == undefined) {
                    node.error("No payload defined!");
                    break;
                }
    
                if (msg.payload.message == undefined) {
                    node.error("No message defined! A message is required to create an alert.");
                    break;
                }
                
                og.createAlert(msg.payload).then((aResult) => {
                    if (aResult.success) {
                        //Accepted
                        node.log("An Opsgenie alert was created successfully with message: '" + msg.payload.message + "'");
                    } else {
                        node.log("There was a problem creating an Opsgenie alert: '" + aResult.error + "'");
                    }
                });
            } catch (error) {
                node.error("There was a problem creating an Opsgenie alert: '" + error.message + "'");    
            }
        });
    }
    RED.nodes.registerType("OpsgenieAlert", OpsgenieAlert);
}