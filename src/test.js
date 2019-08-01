// function sendQuery(url) {
//     return new Promise((resolve, reject) => {
//             resolve("blah");
//     });
// }

// async function getAccountInfo() {
//     try {
//         // var result = 'Hallo';
//         var result = await sendQuery('account');
//     } catch(err) {
//         var result = err;
//     }
//     return result;
// }

var OG = require('./opsgenie_api.js');
var og = new OG('a7b571c4-294c-49d1-a326-ff4990115842');

// og.getAccountInfo().then((dieresult) => {
//     console.log(JSON.stringify(dieresult));
// });

var dieparams = {
    message: 'Toets!!',
    alias: '123',
    source: 'NodeRed'
};
og.createAlert(dieparams).then((dieresult) => {
    console.log(JSON.stringify(dieresult));
});