# 19장 프로토타입

- 자바스크립트는 객체 기반의 프로그래밍 언어이며, 원시 타입의 값을 제외한 나머지 값들은 모두 객체다.

## 19.1 객체지향 프로그래밍

- 객체지향 프로그래밍은 객체의 집한으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다.
- 객체지향 프로그래밍은 실세계의 실체를 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작한다.
- 실체는 특징이나 성질을 나타내는 속성을 가지고 있고, 이를 통해 구별하여 인식한다.
- 이처럼 다양한 속성 중에서 프로그램에 필요한 속성만 간추려 내어 표현하는 것을 추상화라 한다.
- 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 객체라한다.
- 객체는 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조이다. 이때 객체의 상태 데이터를 프로퍼티, 동작을 메서드라 부른다.

<!-- Line -->

---

## 19.2 상속과 프로토타입

- 상속은 객체지향 프로그래밍의 핵심 개념으로 어떤 객체의 프로퍼티나 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다.
- 자바스크립트는 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거한다.
- 이처럼 동일한 생성자 함수에 의해 생성된 모든 인스턴스가 동일한 메서드를 중복 소유하는 것은 메모리를 불필요하게 낭비한다.
- 자바스크립트는 프로토타입을 기반으로 상속을 구현한다.

### 예제 19-03

```javascript
// 생성자 함수
function Circle(radius) {
this.radius = radius;
this.getArea = function () {
// Math.PI는 원주율을 나타내는 상수다.
return Math.PI \* this.radius \*\* 2;
};
}

// 반지름이 1인 인스턴스 생성
const circle1 = new Circle(1);
// 반지름이 2인 인스턴스 생성
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
// getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
// getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
console.log(circle1.getArea === circle2.getArea); // false

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```

### 예제 19-04

```javascript
// 생성자 함수
function Circle(radius) {
this.radius = radius;
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를
// 공유해서 사용할 수 있도록 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
return Math.PI \* this.radius \*\* 2;
};

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
// 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받는다.
// 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```

<!-- Line -->

---

## 19.3 프로토타입 객체

- 프로토타입 객체란 객체지향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해 사용된다.
- 프로토타입은 어떤 객체의 상위 객체의 역할을 하는 객체로서 다른 객체에 공유 프로퍼티또는 메서드를 제공한다.
- 모든 객체는 [[Prototype]] 이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조다.(null인 경우도 있다.)
- 즉, 객체가 생성될때 객체 생성 방식에 따라 프로토타입이 결정되고 [[Prototype]]에 저장된다.
- 모든 객체는 하나의 프로토타입을 갖는다. 만약 [[Prototype]] 값이 null인 객체는 프로토타입이 없다.

### 19.3.1 \_ _ proto _ \_ 접근자 프로퍼티

- 모든 객체는 \_ _ proto _ \_ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[Prototype]]내부 슬롯에 간접적으로 접근할 수 있다.

### \_ _ proto _ \_ 접근자 프로퍼티

- 내부 슬롯은 프로퍼티가 아니다.
- 따라서 자바스크립트는 원칙적으로 내부 슬롯과 메서드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않는다.
- \_ _ proto _ \_ 접근자 프로퍼티를 통해 프로토타입에 접근하면 내부적으로 \_ _ proto _ \_ 접근자 프로퍼티의 getter 함수인 [[Get]]이 호출된다.
- \_ _ proto _ \_ 접근자 프로퍼티를 통해 프로토타입에 할당하면 내부적으로 \_ _ proto _ \_ 접근자 프로퍼티의 setter 함수인 [[Set]]이 호출된다.

### \_ _ proto _ \_ 접근자 프로퍼티는 상속을 통해 사용된다.

- \_ _ proto _ \_ 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티다. 상속을 통해 사용한다.

### \_ _ proto _ \_ 접근자 프로퍼티를 통해 접근하는 이유

- [[Prototype]]내부 슬롯의 값, 즉 프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위해서이다.
- 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다.
- 순환 참조하는 프로토타입 체인이 만들어지면 종점이 존재하지 않기 때문에 프로토타입 체인에서 프로퍼티 검색할 때 무한 루프에 빠진다.

### \_ _ proto _ \_ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.

- 그 이유는 모든 객체가 \_ _ proto _ \_ 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문이다.

### 예제 19-06

```javascript
const obj = {};
const parent = { x: 1 };

// getter 함수인 get **proto**가 호출되어 obj 객체의 프로토타입을 취득
obj.**proto**;
// setter함수인 set **proto**가 호출되어 obj 객체의 프로토타입을 교체
obj.**proto** = parent;

console.log(obj.x); // 1
```

### 예제 19-07

```javascript
const person = { name: 'Lee' };

// person 객체는 **proto** 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty('**proto**')); // false

// **proto** 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '**proto**'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 모든 객체는 Object.prototype의 접근자 프로퍼티 **proto**를 상속받아 사용할 수 있다.
console.log({}.**proto** === Object.prototype); // true
```

### 예제 19-08

```javascript
const parent = {};
const child = {};

// child의 프로토타입을 parent로 설정
child.**proto** = parent;
// parent의 프로토타입을 child로 설정
parent.**proto** = child; // TypeError: Cyclic **proto** value
```

### 예제 19-09

```javascript
// obj는 프로토타입 체인의 종점이다. 따라서 Object.**proto**를 상속받을 수 없다.
const obj = Object.create(null);

// obj는 Object.**proto**를 상속받을 수 없다.
console.log(obj.**proto**); // undefined

// 따라서 Object.getPrototypeOf 메서드를 사용하는 편이 좋다.
console.log(Object.getPrototypeOf(obj)); // null
```

### 예제 19-10

```javascript
const obj = {};
const parent = { x: 1 };

// obj 객체의 프로토타입을 취득
Object.getPrototypeOf(obj); // obj.**proto**;
// obj 객체의 프로토타입을 교체
Object.setPrototypeOf(obj, parent); // obj.**proto** = parent;

console.log(obj.x); // 1
```

### 19.3.2 함수 객체의 prototype

- 함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.
- 모든 객체가 가지고 있는 \_ _ proto _ \_ 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킨다.
- 하지만 이들 프로퍼티를 사용하는 주체가 다르다.

<!-- Table -->

| 구분                            |    소유     | 값                | 사용주체    | 사용목적                                                           |
| :------------------------------ | :---------: | ----------------- | ----------- | ------------------------------------------------------------------ |
| \_ _ proto _ \_ 접근자 프로퍼티 |  모든 객체  | 프로토타입의 참조 | 모든 객체   | 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용            |
| Prototype 프로퍼티              | constructor | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체의 프로토타입을 할당하기 위해 사용 |

### 예제 19-12

```javascript
// 화살표 함수는 non-constructor다.
const Person = (name) => {
  this.name = name;
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(Person.hasOwnProperty("prototype")); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(Person.prototype); // undefined

// ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructor다.
const obj = {
  foo() {},
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(obj.foo.hasOwnProperty("prototype")); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(obj.foo.prototype); // undefined
```

### 예제 19-13

```javascript
// 생성자 함수
function Person(name) {
this.name = name;
}

const me = new Person('Lee');

// 결국 Person.prototype과 me.**proto**는 결국 동일한 프로토타입을 가리킨다.
console.log(Person.prototype === me.**proto**); // true
```

### 예제 19-14

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// me 객체의 생성자 함수는 Person이다.
console.log(me.constructor === Person); // true
```

### 19.3.3 프로토타입의 constructor 프로퍼티와 생성자 함수

- 모든 프로토타입은 constructor 프로퍼티를 갖는다.
- 이 constructor프로퍼티는 prototype 프로퍼티로 자신을 참조하는 있는 생성자 함수를 가리킨다.

<!-- Line -->

---

## 19.4 리터럴 표기법에 의해 성성된 객체의 생성자 함수와 프로토타입

- 생성자 함수에 의해 생성된 인스턴스는 프로토타입의 constructor 프로퍼티에 의해 생성자 함수와 연결된다.
- 이때 constructor 프로퍼티가 가리키는 생성자 함수는 인스턴스를 생성한 생성자 함수다.
- 리터럴 표기범에 의해 생성된 객체의 경우 프로토타입의 constructor 프로퍼티가 기리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수는 없다.
- Object 생성자 함수 호출과 객체 리터럴의 평가는 빈 객체를 생성하는 점은 동일하나 new.target의 확인이나 프로퍼티를 추가 등 세부 내용은 다른다
- 따라서 객체 리터럴에 의해 생성된 객체는 Object 생성자 함수가 생성한 객체가 아니다.
- 리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하다.
- 따라서 표기법에 의해 성성된 객체도 가상적인 생성자 함수를 갖는다.
- 프로토타입은 생성자 함수와 더불어 생성되며 prototype, constructor 프로퍼티에 의해 연결되어 있기 때문에 언제나 프로토타입과 생성자 함수는 쌍으로 존재한다.
- 따라서 프로토타입의 constructor 프로퍼티를 통해 연결되어 있는 생성자 함수를 리터럴 표기법으로 생성한 객체를 생성한 생성자 함수로 생각해도 크게 무리는 없다.

### 예제 19-15

```javascript
// obj 객체를 생성한 생성자 함수는 Object다.
const obj = new Object();
console.log(obj.constructor === Object); // true

// add 함수 객체를 생성한 생성자 함수는 Function이다.
const add = new Function("a", "b", "return a + b");
console.log(add.constructor === Function); // true

// 생성자 함수
function Person(name) {
  this.name = name;
}

// me 객체를 생성한 생성자 함수는 Person이다.
const me = new Person("Lee");
console.log(me.constructor === Person); // true
```

### 예제 19-16

```javascript
// 객체 리터럴
const obj = {};

// 함수 리터럴
const add = function (a, b) {
  return a + b;
};

// 배열 리터럴
const arr = [1, 2, 3];

// 정규표현식 리터럴
const regexp = /is/gi;
```

### 예제 19-17

```javascript
// obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성했다.
const obj = {};

// 하지만 obj 객체의 생성자 함수는 Object 생성자 함수다.
console.log(obj.constructor === Object); // true
```

### 예제 19-18

```javascript
// 2. Object 생성자 함수에 의한 객체 생성
// Object 생성자 함수는 new 연산자와 함께 호출하지 않아도 new 연산자와 함께 호출한 것과 동일하게 동작한다.
// 인수가 전달되지 않았을 때 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성한다.
let obj = new Object();
console.log(obj); // {}

// 1. new.target이 undefined나 Object가 아닌 경우
// 인스턴스 -> Foo.prototype -> Object.prototype 순으로 프로토타입 체인이 생성된다.
class Foo extends Object {}
new Foo(); // Foo {}

// 3. 인수가 전달된 경우에는 인수를 객체로 변환한다.
// Number 객체 생성
obj = new Object(123);
console.log(obj); // Number {123}

// String 객체 생성
obj = new Object("123");
console.log(obj); // String {"123"}
```

### 예제 19-19

```javascript
// foo 함수는 Function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성했다.
function foo() {}

// 하지만 constructor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 Function 생성자 함수다.
console.log(foo.constructor === Function); // true
```

<!-- Line -->

---

## 19.5 프로토타입의 생성 시점

- 객체는 리터럴 표기법 또는 생성자 함수에 의해 생성되므로 결국 모든 객체는 생성자 함수와 연결되어 있다.
- 프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.

### 19.5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점

- 생성자 함수로서 호출할 수 있는 함수, 즉 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
- 함수 호이스팅에서 보았듯이 함수 선언문은 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행된다. 따라서 함수 선언문으로 정의된 생성자 함수는 어떤 코드보다 먼저 평가되어 함수 객체가 된다. 이때 프로토타입도 더불어 생성된다.
- 생성된 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩된다.
- 생성된 프로토타입은 오직 constructor 프로퍼티만을 갖는 객체다. 프로토타입도 객체이고 모든 객체는 프로토타입을 가지므로 프로토타입도 자신의 프로토타입을 갖는다
- 생성된 프로토타입의 프로토타입은 Object.prototype이다.
- 사용자 정의 생성자 함수는 자신이 평가되어 함수 객체로 생성되는 시점에 프로토타입도 더불어 생성며, 생성된 프로토타입의 프로토타입은 언제나 Object.prototype이다.

### 예제 19-20

```javascript
// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
console.log(Person.prototype); // {constructor: ƒ}

// 생성자 함수
function Person(name) {
  this.name = name;
}
```

### 예제 19-21

```javascript
// 화살표 함수는 non-constructor다.
const Person = (name) => {
  this.name = name;
};

// non-constructor는 프로토타입이 생성되지 않는다.
console.log(Person.prototype); // undefined
```

### 19.5.2 빌트인 생성자 함수와 프로토타입 생성 시점

- 빌트인 생성자 함수도 일반 함수와 마찬가지로 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다.
- 모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성된다.
- 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩된다.
- 전역객체 : 코드가 실행되기 이전 단계에 JS엔진에 의해 성성되는 특수한 객체다.
- 이처럼 객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재한다.
- 이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 [[Prototype]] 내부 슬롯에 할당된다. 이로써 생성된 객체는 프로토타입을 상속받는다.
