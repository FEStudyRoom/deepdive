# 21장 빌트인 객체

## 객체의 분류
자바스크립트 객체는 다음 3가지 객체로 분류할 수 있다.

- 표준 빌트인 객체(standard built-in objects/native objects/global objects)
- 호스트 객체(host objects)
- 사용자 정의 객체(user-defined objects)

### 표준 빌트인 객체
ECMAScript 사양에 정의한 객체이며 자바스크립트 실행환경(브라우저 또는 Node.js)에 제약없이 사용할 수 있다.
Math, Reflect, JSON을 제외한 빌트인 객체는 모두 인스턴스를 생성할 수 있다. 

#### 원시값과 래퍼 객체
코드에서 하기와 같이 string 원시값으로 선언해도 String 빌트인 객체가 제공하는 다양한 메소드를 사용할 수 있다.

```javascript
const name = 'bomee';
console.log(name.split(''));
```

하기 이미지를 보면 분명 `name` 은 문자열 원시값이고 `console.dir` 로 확인했을 때 어떤 빌트인객체의 프로토타입이 존재하지 않는 것을 확인할 수 있다. 그렇다면, 어떻게 `split` 과 같이 접근할 수 있을까?

<img width="333" alt="image" src="https://github.com/nanuya/study/assets/89110544/652275d5-307e-4220-bea0-a4f53f87cf17">

> 키워드는 `래퍼 객체(wrapper object)`다!

원시값을 객체처럼 접근하면 자바스크립트 엔진은 일시적으로 원시값 타입에 맞는 객체로 변환한다. 

```javascript
const name = 'bomee';

// const name = new String('bomee'); 임시 객체를 생성
name.split('');

```

임시 객체가 생성되면 원래 값은 `[[StringData]]` 임시 객체의 내부 슬롯에 할당된다. 이후 임시 객체 프로퍼티에 접근하거나 메서드를 호출하고 나면 다시 원시값으로 되돌리고 임시 객체는 가비지 컬렉션 대상이 된다.

문자열, 숫자, 불리언, 심벌 이외의 원시값, 즉 `null` 과 `undefined`는 임시 객체를 생성하지 않는다.

#### 전역 객체
자바스크립트 엔진은 어떤 객체보다도 가장 먼저 전역객체를 생성한다. 전역 객체는 계층적 구조상 어떤 객체에도 속하지 않은 모든 빌트인 객체의 최상위 객체다. 하지만, 프로토타입 상속 관계상 최상위 객체라는 의미는 아니다.

최상위 객체라는 의미는 어떤 객체의 프로퍼티도 아니며 객체의 계층 구조상 하기 객체를 프로퍼티로 소유한다는 것을 의미한다.
- 표준 빌트인 객체
- 호스트 객체


### 호스트 객체
ECMAScript 에 정의되지는 않았지만 자바스크립트 실행환경에서 추가로 제공하는 객체다.
브라우저 환경에서는 DOM, BOM, Canvas, requestAnimationFrame, fetch, SVG, Web Storage, Web Components, Web Worker 와 같이 Web API를 호스트 객체로 제공하고 노드에서는 고유 API를 호스트 객체로 제공한다.

#### BOM
TODO

#### Web Components
TODO

### 사용자 정의 객체
사용자가 직접 정의한 객체이다.
