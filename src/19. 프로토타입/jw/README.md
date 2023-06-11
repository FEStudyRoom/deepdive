19.Prototype

자바스크립트는 프로토타입 기반의 객체지향 프로그래밍 언어이다. 
-자바스크립트는 객체 기반의 프로그래밍 언어이며 자바스크립트를 이루고 있는 거의 “모든 것”이 객체이다.
-원시 타입의 값을 제외한 나머지 값들(함수, 배열, 정규표현식 등)은 모두 객체다.

*객체 : 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조라고 한다.
보통 관련된 내용을 묶어서 사용한다. 예를 들어 x,y 좌표가 될 수 있다. 
const point = {x:1, y:1}와 같이 관련된 내용을 저장할때 사용 

*상속은 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다.
=> 즉, 프로토타입은 상속을 위해서 사용한다고 봐야한다. 

생성자 함수

    function Circle(radius) { 
      this.radius = radius;
      this.getArea = function() {
        return Math.PI * this.radius ** 2;
	    }
    }
    const circle1 = new Circle(1);
    const circle2 = new Circle(2);
    console.log(circle.getArea === circle2.getArea); // false
    console.log(circle1.getArea());
    console.log(circle2.getArea());

=> Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는 getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다. 

getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다. (메모리 낭비)

*프로토타입을 기반으로 상속을 구현

    function Circle(radius) {
      this.radius = radius;
    }
    Circle.prototype.getArea = function () {
      return Math.PI * this.radius ** 2;
    }
    const circle1 = new Circle(1);
    const circle2 = new Circle(2);
    console.log(circle1.getArea === circle2.getArea); // true
    console.log(circle1.getArea());
    console.log(circle2.getArea());

=> Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는 프로토타입 Circle.prototype 으로부터 getArea 메서드를 상속받는다.
즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다. 
=> 상속은 코드의 재사용이란 관점에서 매우 유용하다. 

생성자 함수가 생성할 모든 인스턴스가 공통적으로 사용할 프로퍼티나 메서드를 프로토타입에 미리 구현해 두면 생성자 함수가 생성할 모든 인스턴스는 별도의 구현없이 상위 객체인 프로토타입의 자산을 공유하여 사용할 수 있다.
객체가 생성될때 객체 생성 방식에 따라 프로토타입이 결정되고 [[Prototype]]에 저장된다. 
예를 들면 객체 생성 방법에는 5가지 방법이 있다. 

-객체 리터럴, Object 생성자 함수, 생성자 함수, Object.create 메서드, 클래스
공통점으로는 OrdinaryObjectCreate에 의해서 생성된다. 
(생성 순서)
1.빈 객체 생성 2.프로퍼티 추가 3.프로토타입을 [[Prototype]] 내부 슬롯에 할당 4.생성한 객체 반환

[[Prototype]] 내부 슬롯에는 직접 접근할 수 없지만, __proto__ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 자신의 [[Prototype]] 내부 슬롯이 가리키는 프로토타입에 간접적으로 접근할 수 있다.
child.__proto__ = parent; 이렇게 접근해서 할당할 수 있지만 권장하지 않는다.
*__proto__ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다. 

non-constructor : 생성자 함수로서 호출할 수 없는 함수를 의미하며 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다. 
*생성자 함수는 객체를 생성하는 시점에 프로토타입도 같이 생성된다.

    const Person = name => { 
      this.name = name;
    }
    console.log(Person.prototype); // undefined : non-contructor는 프로토타입을 생성하지 않는다. 

    function Person(name) {
      this.name = name;
    }
    console.log(Person.prototype); // {constructor: f}

프로토타입 체인
-객체의 프로퍼티에 접근하려고 할때 해당 객체에 프로퍼티가 없으면 [[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다! 이것을 프로토타입 체인이라고 한다.
=> obj.hasOwnProperty(‘name’); obj.hasOwnProperty을 사용할 수 있는 이유! 
<br/>
<img width="315" alt="• constructor" src="https://github.com/FEStudyRoom/deepdive/assets/135497766/ed113428-db6d-429f-8402-d32bcd752c1c">
<br/>

instanceof 연산자
객체 instanceof 생성자함수
<br/>
<img width="268" alt="스크린샷 2023-06-11 오후 11 51 24" src="https://github.com/FEStudyRoom/deepdive/assets/135497766/ec4d0292-aaec-4386-ab29-43f31b78a6fd">
<br/>
=> Person 뿐만 아니라 Object도 true가 나온것을 확인할 수 있다.

정적 프로퍼티/메서드
생성자 함수 객체가 소유한 프로퍼티/메서드를 정적 프로퍼티/메서드라고 한다.
=> Object.assign, Array.isArray 등등

*셰도잉 : 상속관계에 의해 프로퍼티가 가려지는 현상 

Quiz는 현장에서...
