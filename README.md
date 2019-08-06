This node-red node is used to work with [Opsgenie](https://www.opsgenie.com) using the REST API.

NOTE: This is a work in progress and currently only implements a very limited part of the Opsgenie Alert API functionality. The intention is to extend this project to cover all API functionality using a node for each API (eg. Alert API, Incident API, etc.)

Please feel free to contribute code by submitting pull requests. 

Alternatively, submit an issue on the [GitHub project page](https://github.com/edreanernst/node-red-contrib-opsgenie) and I will be more than willing to code the additional functionality myself according to the needs out there.

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Properties](#properties)
- [Usage](#usage)
  - [msg.action](#msgaction)
  - [msg.payload](#msgpayload)
  - [msg.identifier](#msgidentifier)
  - [msg.identifierType](#msgidentifiertype)
- [Examples](#examples)
  - [Create a simple alert](#create-a-simple-alert)
  - [Create an alert with an alias and source](#create-an-alert-with-an-alias-and-source)
  - [Close an alert using alias as reference and adding a note](#close-an-alert-using-alias-as-reference-and-adding-a-note)

## Dependencies
This node depends on the following libraries :
* https (https://www.npmjs.com/package/https)

## Installation
This node can be installed through the Palette Manager in node-red.

It can also be installed by running the following command in your node-red directory (usually ~/.node-red) :
```
npm install node-red-contrib-opsgenie
```

## Properties
The node has the following properties :
* Parameters
  * This points to a configuration node that contains the information needed to connect to the Opsgenie API.
* Name
  * The chosen name for the node.

The configuration node has the following properties:
* API Host
  * This defines the API host that should be used. Default is 'api.opsgenie.com'.
* Version
  * The API version. The default is 'v2'.
* API Key
  * This is the API key created in your Opsgenie account. Refer to the Opsgenie documentation on how to create an API key.

## Usage
This node will accept the following fields as input:

### msg.action
This is a string field where an action can be specified that should be performed on alerts.

Accepted action strings are :
* "create" - This will create a new alert according to the parameters defined in <code>msg.payload</code>
* "close" - This will close an existing alert using <code>msg.identifier</code> and <code>msg.identifierType</code> as reference

### msg.payload
This field is a JSON record defining the parameters that will be sent as the REST API body. The parameters will differ depending on the action being performed. Refer to the Opsgenie API documentation for more information.

As an example, if you want to create a new alert with an alias the payload will be :
```
"payload": {
    "message": "Alert world!",
    "alias": "myalertalias"
}
```

### msg.identifier
This field is required when closing an alert. It is a string field that should contain the identifier used to identify the relevant alert that should be closed.

### msg.identifierType
This field is also required when closing an alert. It is a string field that should contain the type of identifier used in <code>msg.identifier</code>. Possible values are:
* "id"
* "tiny"
* "alias"

Please refer to the Opsgenie API documentation for descriptions of each of these identifier types.

## Examples

### Create a simple alert
```
"msg": {
    "action": "create",
    "payload": {
        "message": "Simple alert message"
    }
}
```

### Create an alert with an alias and source
```
"msg": {
    "action": "create",
    "payload": {
        "message": "Red alert!",
        "source": "noderedflow",
        "alias": "redalert"
    }
}
```

### Close an alert using alias as reference and adding a note
```
"msg": {
    "action": "close",
    "identifier": "redalert",
    "identifierType": "alias",
    "payload": {
        "note": "Node was here!"
    }
}
```