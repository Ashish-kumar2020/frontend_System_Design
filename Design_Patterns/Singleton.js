const singleton = (function () {
    let instance;
    function createInstance() {
        const object = new Object("I am the Instance");
        return object;
    }

    return {
        getInstance : function() {
            if(!instance){
                instance = createInstance();
            }
            return instance;
        }
    }
})();

const object1 = singleton.getInstance();
const object2 = singleton.getInstance();
console.log(object1)
console.log(object2)
console.log(object1 === object2)


const Singleton = (function () {
    let instance = 0;

    return {
        increment() {
            instance++;
            return instance;
        }
    };
})();

// const fn = Singleton.increment;

// console.log(fn());
// console.log(fn());
function outer() {
    let x = 10;

    function inner() {
        console.log(x);
    }

    x = 20;

    return inner;
}

const fn = outer();
fn();