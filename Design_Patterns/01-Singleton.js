
const Singleton = (function () {
    let instance;

    function createInstance(){
        const object = new Object("I am the instance");
        return object;
    }

    return {
        getInstance : function(){
            if(!instance){
                instance = createInstance();
            }
            return instance;
        }
    }
})();

const object1 = Singleton.getInstance();
object1.name = "Ashish";
// const object2 = Singleton.getInstance();
let object2 = {
    name: "Ashish"
}
// console.log(object2.name)
console.log(object1 === object2)
console.log(object1.name === object2.name);