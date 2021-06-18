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

<!-- Line -->

---

## 19.6 객체 생성 방식과 프로토타입의 결정

- 각 방식마다 세부적인 객체 생성 방식의 차이는 있으나 추상 연산 OrdinaryObjectCreate에 의해 생성된다는 공통점이 있다.
- 추상 연산 OrdinaryObjectCreate는 필수적으로 자신이 생성할 객체의 프로토타입을 인수로 전달받는다.
- 즉, 프로토타입은 추상연산 OrdinaryObjectCreate에 전달되는 인수에 의해 경정된다. 이 인수는 객체가 생성되는 시점에 객체 생성방식에 의해 결정된다.

### 19.6.1 객체 리터럴에 의해 생성된 객체의 프로토타입

- JS엔진은 객체 리터럴을 평가하여 객체를 생성할 때 추상 연산 OrdinaryObjectCreate을 호출한다.
- 즉, 객체 리터럴에 의해 생성되는 객체의 프로토타입은 Object.prototype이다. 이로써 Object.prototype을 상속받는다.

### 예제 9 - 24

```javascript
const obj = {
  x: 1,
};
```

### 19.6.2 Object 생성자 함수에 의해 생성된 객체의 프로토타입

- Object 생성자 함수를 인수 없이 호출하면 빈객체가 생성된다. 동시에 추상 연산 OrdinaryObjectCreate가 호출된다.
- 이때 추상 연산 OrdinaryObjectCreate에 전달되는 인수는 Object.prototype이다.
- 즉, Object 생성자 함수에 의해 생성되는 객체의 프로토타입은 Object.prototype이다. 이로써 Object.prototype를 상속받는다.
- 객체 리터럴과 Object 생성자 함수에 의한 객체 생성 방식의 차이는 프로퍼티를 추가하는 방식에 있다.
- 객체 리터럴은 내부에 프로퍼티를 추가하지만 Object 생성자 함수 방식은 일단 빈 객체를 생성한 이후 프로퍼티를 추가해야 한다.

### 예제 19 - 25

```javascript
const obj = new Object();
obj.x = 1;
```

### 예제 19 - 26

```javascript
const obj = new Object();
obj.x = 1;

// Object 생성자 함수에 의해 생성된 obj 객체는 Object.prototype을 상속받는다.
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty("x")); // true
```

## 19.6.3 생성자 함수에 의해 생성된 객체의 프로토타입

- new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하면 OrdinaryObjectCreate가 호출된다.
- 이때 추상 연산 OrdinaryObjectCreate에 전달되는 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체다.
- 즉, 생성자 함수에 의해 생성되는 객체의 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체다.
- 표준 빌트인 객체인 Object 생성자 함수와 더불어 생성된 프로토타입 Object.prototype은 다양 빌트인 메서드를 갖고 있지만 사용자 정의 생성자 함수Person는 더불어 생성된 프로토타입 Person.prototype의 프로퍼티는 constructor 뿐이다.
- 프로토타입은 객체다. 따라서 프로퍼티를 추가/삭제할 수 있다. 그리고 추가/삭제된 프로퍼티는 프로토타입 체인에 즉각 반영된다.

### 예제 19 - 27

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");
19 - 28;
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person("Lee");
const you = new Person("Kim");

me.sayHello(); // Hi! My name is Lee
you.sayHello(); // Hi! My name is Kim
```

<!-- Line -->

---

## 19.7 프로토타입 체인

- me 객체의 프로토타입은 Person.prototype이다, Person.prototype의 프로토타입은 Object.prototype이다. 프로토타입의 프로토타입은 언제나 Object.prototype이다.
- 자바스크립트는 객체의 프로퍼티에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 [[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 이를 프로토타입 체인이라 한다.
- 프로토타입 체인은 JS가 객체지향 프로그래밍의 상속 구현하는 메커니즘이다.
- call 메서드 : this로 사용할 객체를 전달하면서 함수를 호출한다.
- 프로토타입 체인의 최상위에 위치하는 객체는 언제나 Object.prototype이다. 따라서 모든 객체는 Object.prototype을 상속받는다.
- Object.prototype을 프로토타입 체인의 종점이라한다.
- Object.prototype의 프로토타입, 즉 [[Prototype]] 내부 슬롯의 값은 null이다.
- Object.prototype에서도 프로퍼티를 검색할 수 없는 경우 undefined를 반환한다.
- 자바스크립트 엔진은 프로토타입 체인을 따라 프로퍼티/메서드를 검색한다.
- 프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘이다.
- 스코프 체인은 식별자 검색을 한 메커니즘이다.
- 스코프 체인과 프로토타입 체인은 서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용된다.

### 예제 19 - 29

```javascript
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person("Lee");

// hasOwnProperty는 Object.prototype의 메서드다.
console.log(me.hasOwnProperty("name")); // true
```

### 예제 19 - 30

```javascript
Object.getPrototypeOf(me) === Person.prototype; // -> true
```

### 예제 19 - 31

```javascript
Object.getPrototypeOf(Person.prototype) === Object.prototype; // -> true
```

### 예제 19 - 32

```javascript
// hasOwnProperty는 Object.prototype의 메서드다. me 객체는 프로토타입 체인을 따라 hasOwnProperty
// 메서드를 검색하여 사용한다.
me.hasOwnProperty("name"); // -> true
```

### 예제 19 - 33

```javascript
Object.prototype.hasOwnProperty.call(me, "name");
```

### 예제 19 - 34

```javascript
console.log(me.foo); // undefined
```

### 예제 19 - 35

```javascript
me.hasOwnProperty("name");
```

<!-- Line -->

---

## 19.8 오버라이딩과 프로퍼티 섀도잉

- 프로토타입이 소유한 프로퍼티를 프로토타입 프로퍼티, 인스턴스가 소유한 프로퍼티를 인스턴스 프로퍼티라고 부른다.
- 프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 프로토타입 체인을 따라 프로토타입 프로퍼티를 검색하여 프로토타입 프로퍼티를 덮어쓰는 것이 아니라 인스턴스 프로퍼티로 추가한다.
- 이때 인스턴스 메서드는 프로토타입 메서드를 오버라이딩 했고, 프로토타입 메서드는 가려진다. 이처럼 가려지는 현상을 프로퍼티 섀도잉이라 한다.
- 오버라이딩 : 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식이다.
- 프로토타입 체인을 통해 프로토타입 메서드가 삭제되지 않는다. 이는 하위 객체를 통해 프로토타입의 프로퍼티를 변경 또는 삭제하는 것은 불가능하다.
- 하위 객체를 통해 프로토타입에 get액세스는 가능하나 set액세스는 허용되지 않는다.
- 프로토타입 프로퍼티를 변경하려면 직접 접근해야한다.

### 예제 19 - 36

```javascript
const Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  // 생성자 함수를 반환
  return Person;
})();

const me = new Person("Lee");

// 인스턴스 메서드
me.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};

// 인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
me.sayHello(); // Hey! My name is Lee
```

### 예제 19 - 37

```javascript
// 인스턴스 메서드를 삭제한다.
delete me.sayHello;
// 인스턴스에는 sayHello 메서드가 없으므로 프로토타입 메서드가 호출된다.
me.sayHello(); // Hi! My name is Lee
```

### 예제 19 - 38

```javascript
// 프로토타입 체인을 통해 프로토타입 메서드가 삭제되지 않는다.
delete me.sayHello;
// 프로토타입 메서드가 호출된다.
me.sayHello(); // Hi! My name is Lee
```

### 예제 19 - 39

```javascript
// 프로토타입 메서드 변경
Person.prototype.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};
me.sayHello(); // Hey! My name is Lee

// 프로토타입 메서드 삭제
delete Person.prototype.sayHello;
me.sayHello(); // TypeError: me.sayHello is not a function
```

<!-- Line -->

---

## 19.9 프로토타입의 교체

- 프로토타입은 생성자 함수 또는 인스턴스에 의해 교체할 수 있다.

### 19.9.1 생성자 함수에 의한 프로토타입의 교체

- 프로토타입으로 교체한 객체 리터럴에는 constructor 프로퍼티가 없다. constructor 프로퍼티는 JS엔진이 프로토타입을 생성할 때 암묵적으로 추가한 프로퍼티다.
- 이처럼 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
- 파괴된 constructor 프로퍼티와 생성자 함수 간의 연결하려면 교체한 객체 리터럴에 constructor 프로퍼티를 추가하면된다.

### 예제 19 - 40

```javascript
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  // ① 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    },
  };

  return Person;
})();

const me = new Person("Lee");
```

### 예제 19 - 41

```javascript
// 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
console.log(me.constructor === Object); // true
```

### 예제 19 - 42

```javascript
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Person.prototype = {
    // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
    constructor: Person,
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    },
  };

  return Person;
})();

const me = new Person("Lee");

// constructor 프로퍼티가 생성자 함수를 가리킨다.
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false
```

### 19.9.2 인스턴스에 의한 프로토타입의 교체

- 인스턴스의 \_ _ proto _ \_ 접근자 프로퍼티 (또는 Object.setPrototypeOf 메서드)를 통해 프로토타입을 교체할 수 있다.
- 생성자 함수의 prototype 프로퍼티에 다른 임의의 객체를 바인딩하는 것은 미래에 생성할 인스턴스의 프로토타입을 교체하는 것이다.
- \_ _ proto _ \_ 접근자 프로퍼티를 통해 프로토타입을 교체하는 것은 이미 생성된 객체의 프로토타입을 교체하는 것이다.
- 프로토타입으로 교체한 객체에는 constructor 프로퍼티가 없으므로 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
- 하지만 미묘한 차이가 있다. 생성자 함수에 의한 프로토타입 교체에서는 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킨다. 하지만 인스턴스에 의한 프로토타입 교체에서는 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리키지 않는다.
- 상속 관계를 동적으로 변경하는 것은 번거롭다. 따라서 프로토타입을 직접 교체하지 않는 것이 좋다.

### 예제 19 - 43

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// 프로토타입으로 교체할 객체
const parent = {
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

// ① me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다. me.**proto** = parent;

me.sayHello(); // Hi! My name is Lee
```

### 예제 19 - 44

```javascript
// 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
console.log(me.constructor === Object); // true
```

### 예제 19 - 45

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// 프로토타입으로 교체할 객체
const parent = {
  // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
  constructor: Person,
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

// 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결을 설정
Person.prototype = parent;

// me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다. me.**proto** = parent;

me.sayHello(); // Hi! My name is Lee

// constructor 프로퍼티가 생성자 함수를 가리킨다.
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false

// 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킨다.
console.log(Person.prototype === Object.getPrototypeOf(me)); // true
```

<!-- Line -->

---

## 19.10 instanceof 연산자

- instanceof 연산자는 이항 연산자로서 좌변에 객체를 가리키는 식별자, 우변에 생성자 함수를 가리키는 식별자를 피연산자로 받는다. 만약 우변이 함수가 아니면 에러가 발생한다.
- 우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하면 true를 그렇지 않은 경우에는 false로 평가된다.
- (예제19-48) 따라서 프로토타입으로 교체한 parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩하면 true로 평가될 것이다.
- instanceof 연산자는 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수를 찾는 것이 아니라 생성자 함수의 prototype에 바인딩된 객체가 프로토타입 체인 상에 존재하는지 확인한다.
- 따라서 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴되어도 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결은 파괴되지 않으므로 instanceof는 아무런 영향을 받지 않느다.

### 예제 19 - 47

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// 프로토타입으로 교체할 객체
const parent = {};

// 프로토타입의 교체
Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결되어 있지 않다.
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않기 때문에 false로 평가된다.
console.log(me instanceof Person); // false

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```

### 예제 19 - 48

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// 프로토타입으로 교체할 객체
const parent = {};

// 프로토타입의 교체
Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체는 연결되어 있지 않다.
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false

// parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩한다.
Person.prototype = parent;

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Person); // true

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```

### 예제 19 - 50

```javascript
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    },
  };

  return Person;
})();

const me = new Person("Lee");

// constructor 프로퍼티와 생성자 함수 간의 연결은 파괴되어도 instanceof는 아무런 영향을 받지 않는다.
console.log(me.constructor === Person); // false

// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Person); // true
// Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
console.log(me instanceof Object); // true
```

<!-- Line -->

---

## 19.11 직접 상속

### 19.11.1 Object.create에 의한 직접 상속

- Object.create 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성한다.
- Object.create 메서드는 첫 번째 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를 생성한다. 즉, 객체를 생성하면서 직접적으로 상속을 구현한다.
- 프로토타입 체인의 종점에 위치하는 객체 null을 생성하면 Object.prototype의 빌트인 메서드를 사용할 수 없다.

### 예제 19 - 51

```javascript
// 프로토타입이 null인 객체를 생성한다. 생성된 객체는 프로토타입 체인의 종점에 위치한다. obj → null
let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null); // true
// Object.prototype을 상속받지 못한다.
console.log(obj.toString()); // TypeError: obj.toString is not a function

// obj → Object.prototype → null obj = {};와 동일하다.
obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// obj → Object.prototype → null obj = { x: 1 };와 동일하다.
obj = Object.create(Object.prototype, {
  x: {
    value: 1,
    writable: true,
    enumerable: true,
    configurable: true,
  },
});
// 위 코드는 다음과 동일하다. obj = Object.create(Object.prototype); obj.x = 1;
console.log(obj.x); // 1
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

const myProto = {
  x: 10,
};
// 임의의 객체를 직접 상속받는다. obj → myProto → Object.prototype → null
obj = Object.create(myProto);
console.log(obj.x); // 10
console.log(Object.getPrototypeOf(obj) === myProto); // true

// 생성자 함수
function Person(name) {
  this.name = name;
}

// obj → Person.prototype → Object.prototype → null obj = new Person('Lee')와
// 동일하다.
obj = Object.create(Person.prototype);
obj.name = "Lee";
console.log(obj.name); // Lee
console.log(Object.getPrototypeOf(obj) === Person.prototype); // true
```

### 19.11.2 객체 리터럴 내부에서 \_ _ proto _ \_ 에 의한 직접 상속

- ES6에서는 객체 리터럴 내부에서 \_ _ proto _ \_접근자 프로퍼티를 사용하여 직접 상속을 구현할 수 있다.

### 예제 19 - 55

```javascript
const myProto = {
  x: 10,
};

// 객체 리터럴에 의해 객체를 생성하면서 프로토타입을 지정하여 직접 상속받을 수 있다.
const obj = {
  y: 20,
  // 객체를 직접 상속받는다. obj → myProto → Object.prototype → null
  __proto__: myProto,
};
/* 위 코드는 아래와 동일하다.
const obj = Object.create(myProto, {
  y: { value: 20, writable: true, enumerable: true, configurable: true }
});
*/

console.log(obj.x, obj.y); // 10 20
console.log(Object.getPrototypeOf(obj) === myProto); // true
```

<!-- Line -->

---

## 19.12 정적 프로퍼티/메서드

- 정적 프로퍼티/메서드는 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메서드를 말한다.
- 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다. 프로토타입 메서드를 호출하려면 인스턴스를 생성해야 한다.
- 이는 정적 프로퍼티/메서드는 인스턴스의 프로토타입 체인에 속한 객체의 프로퍼티/메서드가 아니므로 인스턴스로 접근할 수 없다.
- 앞에서 살펴본 Object.create메서드는 Object 생성자 함수의 정적 메서드이다. Object 생성자 함수가 생성한 객체로 호출할 수 없다.
- 만약 인스턴스/포로토타입 메서드 내에서 this를 사용하지 않는다면 그 메서드는 정적 메서드로 변경할 수 있다.
- 정적 프로퍼티/메서드와 프로토타입 프로퍼티/메서드를 구별할 수 있어야 한다. 참고로 프로토타입 프로퍼티/메서드를 표기할 때 prototype를 #으로 표기하는 경우도 있다.

### 예제 19 - 56

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

// 정적 프로퍼티
Person.staticProp = "static prop";

// 정적 메서드
Person.staticMethod = function () {
  console.log("staticMethod");
};

const me = new Person("Lee");

// 생성자 함수에 추가한 정적 프로퍼티/메서드는 생성자 함수로 참조/호출한다.
Person.staticMethod(); // staticMethod

// 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다. 인스턴스로 참조/호출할 수 있는 프로퍼티/메서드는 프로토타입
// 체인 상에 존재해야 한다.
me.staticMethod(); // TypeError: me.staticMethod is not a function
```

### 예제 19 - 58

```javascript
function Foo() {}

// 프로토타입 메서드 this를 참조하지 않는 프로토타입 메소드는 정적 메서드로 변경해도 동일한 효과를 얻을 수 있다.
Foo.prototype.x = function () {
  console.log("x");
};

const foo = new Foo();
// 프로토타입 메서드를 호출하려면 인스턴스를 생성해야 한다.
foo.x(); // x

// 정적 메서드
Foo.x = function () {
  console.log("x");
};

// 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있다.
Foo.x(); // x
```

<!-- Line -->

---

## 19.13 프로퍼티 존재 확인

### 19.13.1 in연산자

> key : 프로퍼티 키를 나타내는 물자열<br>
> object : 객체로 평가되는 표현식<br>
> key in object

- in연산자는 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인한다.
- 확인 대상 객체의 프로퍼티뿐만 아니라 확인 대상 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인한다.
- ES6에서 도입된 Reflect.has 메서드는 in연산자와 동일하게 동작한다.

### 예제 19 - 59

```javascript
const person = {
  name: "Lee",
  address: "Seoul",
};

// person 객체에 name 프로퍼티가 존재한다.
console.log("name" in person); // true
// person 객체에 address 프로퍼티가 존재한다.
console.log("address" in person); // true
// person 객체에 age 프로퍼티가 존재하지 않는다.
console.log("age" in person); // false
```

### 예제 19 - 60

```javascript
console.log("toString" in person); // true
```

### 예제 19 - 61

```javascript
const person = {
  name: "Lee",
};

console.log(Reflect.has(person, "name")); // true
console.log(Reflect.has(person, "toString")); // true
```

### 19.13.2 Object.prototype.hasOwnProperty 메서드

- Object.prototype.hasOwnProperty 메서드는 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true를 반환하고 상속받은 프로토타입의 프로퍼티 키인 경우 false를 반환한다.

### 예제 19 - 62

```javascript
console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("age")); // false
```

<!-- Line -->

---

## 19.14 프로퍼티 열거

### 19.14.1 for … in 문

> for ( 변수선언문 in 객체)

- 객체의 모든 프로퍼티를 순회하며 열거하려면 for … in 문을 사용한다. -변수 선언문에서 선언한 변수에 프로퍼티 키를 할당한다. 프로퍼티 키의 개수 많큼 순회한다.
- for … in 문은 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티의 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 true인 프로터피를 순회하며 열거한다.
- for … in 문은 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않는다.
- 상속받은 프로퍼티는 제외하고 객체 자신의 프로퍼티만 열거하려면 Object.prototype.hasOwnProperty 메서드를 사용하여 객체 자신의 프로퍼티인지 확인해야 한다.
- for … in 문은 프로퍼티를 열거할 때 순서를 보장하지 않는다.
- 일반적으로 for…in문보다 for문, for… of 문 또는 Array.prototype.forEach 메서드를 사용을 권장한다.

### 예제 19 - 65

```javascript
const person = {
  name: "Lee",
  address: "Seoul",
};

// in 연산자는 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인한다.
console.log("toString" in person); // true

// for...in 문도 객체가 상속받은 모든 프로토타입의 프로퍼티를 열거한다. 하지만 toString과 같은 Object.prototype의
// 프로퍼티가 열거되지 않는다.
for (const key in person) {
  console.log(key + ": " + person[key]);
}

// name: Lee address: Seoul
```

### 예제 19 - 67

```javascript
const person = {
  name: "Lee",
  address: "Seoul",
  __proto__: {
    age: 20,
  },
};

for (const key in person) {
  console.log(key + ": " + person[key]);
}
// name: Lee address: Seoul age: 20
```

### 예제 19 - 68

```javascript
const sym = Symbol();
const obj = {
  a: 1,
  [sym]: 10,
};

for (const key in obj) {
  console.log(key + ": " + obj[key]);
}
// a: 1
```

### 예제 19 - 69

```javascript
const person = {
  name: "Lee",
  address: "Seoul",
  __proto__: {
    age: 20,
  },
};

for (const key in person) {
  // 객체 자신의 프로퍼티인지 확인한다.
  if (!person.hasOwnProperty(key)) continue;
  console.log(key + ": " + person[key]);
}
// name: Lee address: Seoul
```

### 예제 19 - 70

```javascript
const obj = {
  2: 2,
  3: 3,
  1: 1,
  b: "b",
  a: "a",
};

for (const key in obj) {
  if (!obj.hasOwnProperty(key)) continue;
  console.log(key + ": " + obj[key]);
}

/*
1: 1
2: 2
3: 3
b: b
a: a
*/
```

### 예제 19 - 71

```javascript
const arr = [1, 2, 3];
arr.x = 10; // 배열도 객체이므로 프로퍼티를 가질 수 있다.

for (const i in arr) {
  // 프로퍼티 x도 출력된다.
  console.log(arr[i]); // 1 2 3 10
}

// arr.length는 3이다.
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 1 2 3
}

// forEach 메서드는 요소가 아닌 프로퍼티는 제외한다.
arr.forEach((v) => console.log(v)); // 1 2 3

// for...of는 변수 선언문에서 선언한 변수에 키가 아닌 값을 할당한다.
for (const value of arr) {
  console.log(value); // 1 2 3
}
```

### 19.14.2 Object.keys/values/entries 메서드

- 객체 자신의 고유 프로퍼티만 열거하기 위해서는 Object.keys/values/entries 메서드를 사용하는 것을 권장한다.
- Object.keys 메서드는 객체 자신의 열거 가능한 프로퍼티 키를 배열로 반환한다.
- ES8에 도입된 Object.values 메서드는 객체 자신의 열거 가능한 프로퍼티 값을 배열로 반환한다.
- ES8에 도입된 Object.entries 메서드는 객체 자신의 열거 가능한 프로퍼티 키와 값의 쌍의 배열을 배열에 담아 반환한다.

### 예제 19 - 72

```javascript
const person = {
  name: "Lee",
  address: "Seoul",
  __proto__: {
    age: 20,
  },
};

console.log(Object.keys(person)); // ["name", "address"]
```

### 예제 19 - 73

```javascript
console.log(Object.values(person)); // ["Lee", "Seoul"]
```

### 예제 19 - 74

```javascript
console.log(Object.entries(person)); // [["name", "Lee"], ["address", "Seoul"]]

Object.entries(person).forEach(([key, value]) => console.log(key, value));
/*
name Lee
address Seoul
*/
```
