# 22장 this

> this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수다.
> this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다. (343p.)

하기 예시를 보면 인스턴스를 생성하기 전에는 자신이 속한 객체를 가리킬 방법이 없다.

```javascript
function Animal(type) {
  ???.type = type;

  ???.walk = function () {
    console.log(`${type} can walk!`);
  }
}
```

이를 위해 자바스크립트는 `this`라는 식별자를 제공한다.

```javascript
function Animal(type) {
  this.type = type;

  this.walk = function () {
    console.log(`${this.type} can walk!`);
  }
}

const animal = new Animal('dog');
animal.walk(); //
```

여기서 알 수 있는 점은 `this`는 함수 호출 방식에 따라 동적으로 결정된다는 것이다.

|함수 호출 방식|this 바인딩|
|------|---|
|일반 함수 호출|전역 객체|
|메서드 호출|메서드를 호출한 객체|
|생성자 함수 호출|생성자 함수가 (미래에) 생성할 인스턴스|
|Function.prototype.apply/call/bind 메서드에 의한 간접 호출|Function.prototype.apply/call/bind 메서드에 첫번째 인수로 전달한 객체|


## 일반 함수 호출

- 전역에서 `this`는 전역 객체 `window`를 가리키고, 일반 함수 내부에서 `this`도 전역 객체를 가리킨다.

```javascript
console.log(this) // window

function normalFunction() {
  console.log(this) // window
}

```

- 중첩함수나 콜백함수를 포함한 모든 일반함수에서 this는 전역 객체가 바인딩된다.

```javascript
function outerFunction() {
  console.log(this); // window

  function innerFunction() {
    console.log(this); // window
  }

  innerFunction();
}

outerFunction();
```

[이슈 케이스]

```javascript
const animal = {
  type: 'dog',
  walk() {
    setTimeout(function() {
      console.log(`${this.type} can walk!`);
    });
  }
}

animal.walk();
```

<img width="421" alt="image" src="https://github.com/FEStudyRoom/deepdive/assets/89110544/44d1e774-a1bb-46ef-9733-9e570c725ed4">

이와 같이 중첩 함수, 콜백 함수 등과 같은 일반 함수로 호출되면 `this`에 전역객체가 바인딩된다.

상기에 `[이슈 케이스]`의 경우 `this`가 전역객체에 바인딩되면 로직을 이해하는데 어려움이 생긴다. 대부분 메서드 내의 중첩 함수나 콜백 함수는 메서드 종속적인 행위를 하며 프로퍼티를 접근할 수 있는데 그 때 `this`가 어떤 객체를 가리키는지 명확하게 알 수 없다.

이런 문제를 해결하기 위해 `this`를 명시적으로 바인딩할 수 있다. 화살표함수를 사용하거나 함수를 호출할 때 `apply`, `call` 혹은 `bind` 메서드를 사용할 수 있다.

### apply, call, bind

`Function.prototype`의 메서드다. 즉, 모든 함수는 해당 메소드를 사용할 수 있다. 

- `apply`와 `call`은 함수를 호출한다.

  ```javascript
  function Animal(type) {
    this.type = type;

    this.walk = function() {
      console.log(`${this.type} can walk!`) 
    }
  }

  const dog = new Animal('dog');
  const cat = new Animal('cat');

  dog.walk.call(cat);
  cat.walk.apply(dog);

  ```

  <img width="358" alt="image" src="https://github.com/FEStudyRoom/deepdive/assets/89110544/278bcafa-ecc8-470a-8f30-2562ed845fe2">

- `bind`는 바로 호출하지 않고 `this`만 바인딩한다.

  ```javascript
  function Animal(type) {
    this.type = type;

    this.walk = function() {
      setTimeout(function() {
        console.log(`${this.type} can walk!`) 
      }.bind(this), 0);
    }
  }

  const dog = new Animal('dog');
  dog.walk();
  ```

  <img width="369" alt="image" src="https://github.com/FEStudyRoom/deepdive/assets/89110544/856f61d9-6f84-4c60-8875-fcf85a17e56b">


## 메서드 호출

메서드 내부에서 `this`는 자신을 호출한 객체가 바인딩된다.

```javascript
const animal = {
  type: 'dog',
  walk() {
    console.log(this)
    console.log(`${this.type} can walk!`)
  }
}

animal.walk();
```

<img width="266" alt="image" src="https://github.com/FEStudyRoom/deepdive/assets/89110544/40365678-69e6-4261-a1b0-e1af814b32f1">

- 생성자 함수를 통해 생성한 객체는 인스턴스를 가리킨다.

```javascript
function Animal(type) {
  this.type = type;
  this.walk = function () {
    console.log(this);
    console.log(`${this.type} can walk!`)
  }
}

const animal = new Animal('cat');
animal.walk();
```

<img width="358" alt="image" src="https://github.com/FEStudyRoom/deepdive/assets/89110544/b69ef37f-57d5-4918-b328-f94758ddf66c">

