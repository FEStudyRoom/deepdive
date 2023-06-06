const Animal = (function () {
  function Animal(name) {
    this.name = name;
  }

  Animal.prototype.walk = function () {
    console.log(`${this.name} can walk!`);
  }

  return Animal;
}());

const dog = new Animal('happy');
const bird = new Animal('sky');
const pig = new Animal('cute')

dog.walk = function () {
  console.log(`${this.name} can walk and run!`)
}

bird.walk = function () {
  console.log(`${this.name} can walk and fly!`);
}

dog.walk();
bird.walk();
pig.walk();