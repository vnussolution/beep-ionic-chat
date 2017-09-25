const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addUserMessages = functions.database.ref(`/messages/{messageId}`)
  .onWrite(event => {
    const messageKey = event.data.key;
    const messageValue = event.data.val();

    //console.log('addUserMessage', messageKey, messageValue);
    admin.database().ref(`/user-messages/${messageValue.fromUserId}/${messageValue.toUserId}`).child(messageKey).set(1);
    admin.database().ref(`/user-messages/${messageValue.toUserId}/${messageValue.fromUserId}`).child(messageKey).set(1);
  });

exports.generateLastMessage = functions.database.ref(`messages/{messageId}`).onWrite(event => {
  const key = event.data.key;
  const value = event.data.val();

  console.log('generate lastMessage');

  admin.database().ref(`last-message/${value.fromUserId}/${value.toUserId}`).child('key').set(key);
  admin.database().ref(`last-message/${value.toUserId}/${value.fromUserId}`).child('key').set(key);
});



exports.sanatizeMessage = functions.database.ref(`/messages/{messageId}`)
  .onWrite(event => {
    const message = event.data.val();
    if (message.sanatized || !message.body) return;

    message.sanatized = true;
    console.log('sanatizing ... ', event.params.messageId);
    console.log(message);
    message.title = sanatize(message.title);
    message.body = sanatize(message.body);
    return event.data.ref.set(message);

  });

function sanatize(s) {
  var string = s;
  string = string.replace(/\bstupid\b/ig, 'beatiful');
  console.log('sanatized text: ', string);
  return string;
}
