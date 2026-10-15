class User {
  constructor(id) {
    this.id = id;
    this.active = false;
  }
}

class ObjectPool {
  poolArray = null;
  MIN_SIZE = 1;
  MAX_SIZE = 10;
  INCREASE_PERCENTAGE = 50;
  constructor(size) {
    if (size < this.MIN_SIZE || size > this.MAX_SIZE) {
      throw new Error("Invalid pool size");
    }
    if (!Number.isInteger(size)) {
      throw new Error("Invalid size of an pool");
    }

    this.poolArray = Array.from(
      {
        length: size,
      },
      (_, index) => new User(index + 1),
    );
  }
  acquire() {
    // Return an available user object
    const availableUser = this.poolArray.find((user) => !user.active);
    if(availableUser){
        availableUser.active = true;
        return availableUser;
    }
    const currentSize = this.poolArray.length;
    if (this.poolArray.length >= this.MAX_SIZE) return null;

    const increasedSize = Math.ceil(
      (this.INCREASE_PERCENTAGE * this.poolArray.length) / 100,
    );
    const availableSlots = this.MAX_SIZE - currentSize;
    const userToAdd = Math.min(increasedSize,availableSlots);
    for(let i = 0;i < userToAdd;i++){
        this.poolArray.push(new User(this.poolArray.length + 1));
    }
    const newUser = this.poolArray.find((user) => !user.active);
    if(newUser){
        newUser.active = true;
        return newUser;
    }
    return null;
  }

  release(user) {
    // Mark the user as
    if (this.poolArray.includes(user)) {
      if (user.active === false) {
        throw new Error("Cannot release a object which is already released");
      } else {
        user.active = false;
        return;
      }
    }
    throw new Error("Object does not belong to this pool");
  }
}

const pool = new ObjectPool(3);
const pool1 = new ObjectPool(5);
const user1 = pool.acquire();
const user2 = pool.acquire();
const user3 = pool.acquire();
const user4 = pool.acquire();
const user5 = pool.acquire();
const user6 = pool1.acquire();
pool.release(user1);
// pool.release(user1);
// const user5 = pool.acquire();
// console.log(user5 === user1)
// pool.release(user6)
console.log(user1);
console.log(user4);
console.log(user5);
console.log(user6)