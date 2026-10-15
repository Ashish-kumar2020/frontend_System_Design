
class Handler {
    constructor(){
        this.nextHandler = null;
    }

    setNext(handler){
        // Connect to next handler
        this.nextHandler = handler;
        return handler;
    }

    handle(request){
        // Process the request or pass it forward
        if(this.nextHandler){
          return this.nextHandler.handle(request);
        }
        return "Request Processed successfully";
    }
}

class AuthenticationHandler extends Handler{
    handle(request){
        // Check request is Authenticated
        if(!request.isAuthenticated){
            throw new Error("User is not authenticated");
        }
        return super.handle(request);
    }
}

class ValidHandler extends Handler{
    handle(request){
        // Check is request valid
        if(!request.isValid){
            throw new Error("Invalid Request");
        }
        return super.handle(request);
    }
}

class PermissionHandler extends Handler {
    handle(request){
        // Check request has permission
        if(!request.hasPermission){
            throw new Error("Permission denind");
        }
        return super.handle(request);
    }
}

const auth = new AuthenticationHandler();
const validation = new ValidHandler();
const permission = new PermissionHandler();

auth.setNext(validation).setNext(permission);

const request = {
  isAuthenticated: true,
  isValid: true,
  hasPermission: true,
};

console.log(auth.handle(request));
// "Request processed successfully"