
class EmailNotification{
    send(message){
        console.log(`Email : ${message}`)
    }
}

class SMSNotification{
    send(message){
        console.log(`SMS : ${message}`);
    }
}

class PushNotification{
    send(message){
        console.log(`Push : ${message}`);
    }
}

class NotificationFactory{
    static createNotification(type){
        if(type === "email"){
            return new EmailNotification()
        }else if(type === "sms"){
            return new SMSNotification();
        }else if(type === "push"){
            return new PushNotification();
        }else{
            throw new Error("Invalid Notification Category")
        }
    }
}

const email = NotificationFactory.createNotification("email");
email.send("Welcome!");



const sms = NotificationFactory.createNotification("sms");

sms.send("Your OTP is 1234");

const push = NotificationFactory.createNotification("push");

push.send("You have a new message");