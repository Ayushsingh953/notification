var admin = require("firebase-admin");
const express = require('express');
const cors=require('cors');
const app=express();
const {getMessaging} =require("firebase-admin/messaging");

var serviceAccount = require("./notification-5327a-firebase-adminsdk-wf2sf-2d47a84c25.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send({message:"Hello server"})
})

app.post("/send",(req,res)=>{
    const message = {
        notification: {
          title: 'test',
          body: 'test notification'
        },
        token:"f4OPCdmsQUycx7HkUaUJM1:APA91bFmiCmRbsDYXZ6EqiI2gdBjrTXVSCbHmz2slTBsJCoLCgmxLOOlltmZPvThCGrUC7JGIxS2i2GNy6P-ZgWn4iufu0mZ1udd4M8luYrE1no_ZYsx7UvtjjtjH--vL7X6ttffZWT1"
      };
      
      // Send a message to devices subscribed to the combination of topics
      // specified by the provided condition.
      getMessaging().send(message)
        .then((response) => {
          // Response is a message ID string.
          console.log('Successfully sent message:', response);
          res.send(response);
        })
        .catch((error) => {
          console.log('Error sending message:', error);
        });
})

app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
})