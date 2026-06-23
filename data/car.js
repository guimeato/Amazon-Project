 export class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo(){
    const trunkStatus = this.isTrunkOpen? 'open': 'closed'
    console.log(`${this.#brand} ${this.#model} Speed: ${this.speed} km/h  trunk:${trunkStatus}` );
  }

  go(){
    if(!this.isTrunkOpen){
      this.speed += 5;
    }

    if(this.speed > 200){
        this.speed = 200;
      }
    }

  brake(){
    this.speed -= 5;
    
    if(this.speed < 0){
      this.speed = 0;
    }
  }

  openTrunk(){
    if(this.speed === 0){
      this.isTrunkOpen = true;
    }
  }

  closeTrunk(){
    this.isTrunkOpen = false;
  }

}

export class RaceCar extends Car {
  accelaration;

  constructor(carDetails){
    super(carDetails);
    this.accelaration = carDetails.accelaration;
  }

  go(){
    this.speed += this.accelaration;

    if(this.speed > 300){
      this.speed = 300;
    }
  }

  openTrunk(){
    console.log('Race cars do not have a trunk.');
  }

  closeTrunk(){
    console.log('Race cars do not have a trunk.');
  }
}

const car1 = new Car({brand: 'Toyota', model: 'Corolla'});
const car2 = new Car({brand: 'Tesla', model: 'Model 3'});
const car3 = new RaceCar({brand: 'McLaren',model: 'F1', accelaration: 20});

car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();

// Trunk should not open since the car is moving.
car1.openTrunk();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();

// Trunk should open since the car is not moving.
car2.openTrunk();
// Car should not go since the trunk is open.
car2.go();
car2.displayInfo();


car3.go();
car3.go();
car3.go();
car3.displayInfo();
car3.openTrunk();
car3.displayInfo();
car3.brake();
car3.displayInfo();



