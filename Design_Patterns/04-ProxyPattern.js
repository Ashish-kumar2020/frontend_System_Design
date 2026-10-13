
// Reflect - is a built in method taht provide method for performing fundamental operation in objects usch as reading, writing and checks wether a property exists or not
const person = {
    name: "Ashish",
    age: 26,
    gender: "male"
};

const proxiedPerson = new Proxy(person, {
    get(obj,prop){
        if(prop === "gender"){
            console.log("Gender is a write only property be exposes!");
        }else{
            return Reflect.get(obj,prop);
        }
    },
    set(obj,prop,value){
        if(prop === "age"){
            if(value <= 18 || value > 50){
                console.log("Age value should be between 18 and 50");
            }else{
                Reflect.set(obj,prop,value);
            }
        }else{
            Reflect.set(obj,prop,value);
        }
    }
});

console.log(proxiedPerson.name);
proxiedPerson.age = 26;
console.log(proxiedPerson.age)