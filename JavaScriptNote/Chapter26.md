# 26장

## 26.1 함수의 구분

- ES6 이전의 모든 함수는 일반함수로서 호출할 수 있는 것은 물론 생성자 함수로서 호출할 수 도 있다.
- ES6 이전의 모든 함수는 사용 목적에 따라 명확한 구분이 없므으로 호출 방식에 특별한 제약이 없고 생성자 함수로 호출되지 않아도 프로토타입 객체를 생성한다. 이는 실수를 유발하며 성능에도 좋지않다.

> 이러한 문제를 해결하기 위해 ES6에서는 함수를 사용 목적에 따라 세 가지 종류로 구분했다.
>
> <!-- Table -->
>
> | ES6함수의 구분 | constructor | prototype | super | arguments |
> | :------------: | :---------: | :-------: | :---: | :-------: |
> |    일반함수    |     ⭕      |    ⭕     |  ❌   |    ⭕     |
> |     메서드     |     ⭕      |    ❌     |  ⭕   |    ⭕     |
> |  화살표 함수   |     ❌      |    ❌     |  ❌   |    ❌     |

- 일반 함수는 함수 선언문이나 함수 표현식으로 정의한 함수를 말하며 ES6 이전의 함수와 차이가 없다.
- 하지만 ES6의 메서드와 화살표 함수는 ES6 이전의 함수와 명확한 차이가 있다.
- 일반 함수는 constructor 이미잔 ES6의 메서드와 화살표 함수는 non-constructor다.
<!-- Line -->

---

## 26.2 메서드

- ES6 사양에서 메서드는 메서드 축약 표현으로 정의된 함수만을 의미한다.
- ES6 사양에서 정의한 메서드(ES6 메서드)는 인스턴스를 생성할 수 없는 non-constructor이다. 따라서 ES6메서드는 생성자 함수로서 호출할 수 없다.
- ES6 메서드는 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.
- 참고로 표준 빌드인 객체가 제공하는 프로토타입 메서드와 정적 메서드는 모두 non-constructor이다.
- ES6 메서드는 자신을 바인딩한 객체를 가리키는 내부 슬롯 [[HomeObject]]를 갖는다.
- super 참조는 내부 슬롯 [[HomeObject]]를 사용하여 슈퍼클래스의 메서드를 참조하므로 내부 슬롯 [[HomeObject]]를 갖는 ES6 메서드는 super키워드를 사용할 수 있다.
- ES6 메서드가 아닌 함수는 super키워드를 사용할 수 없다.
- 따라서 메서드를 정의할 때 프로퍼티 값으로 익명 함수 표현식을 할당하는 ES6 이전의 방식은 사용하지 않는 것이 좋다.

### 예제26-05

```javascript
const obj = {
  x: 1,
  // foo는 메서드이다.
  foo() {
    return this.x;
  },
  // bar에 바인딩된 함수는 메서드가 아닌 일반 함수이다.
  bar: function () {
    return this.x;
  },
};

console.log(obj.foo()); // 1
console.log(obj.bar()); // 1
```

### 예제26-06

```javascript
new obj.foo(); // -> TypeError: obj.foo is not a constructor
new obj.bar(); // -> bar {}
```

<!-- Line -->

---

## 26.3 화살표 함수

- 화살표 함수는 function 키워드 대신 화살표 ( =>) 를 사용하여 기존의 함수 정의 방식보다 간략하게 함수를 정의할 수 있다.
- 표현만 간략한 것이 아니라 내부 동작도 기존의 합수보다 간략하다.
- 특히 화살표 함수는 콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다.

### 26.3.1 화살표 함수 정의

> 함수정의

- 화살표 함수는 함수 선언문으로 정의할 수 없고 함수표현식으로 정의해야 한다. 호출 방식은 기존의 함수와 동일하다.

> 매개변수 선언

- 매개변수가 여러 개인 경우 소괄호()안에 매개변수를 선언한다..
- 매개변수가 한개인 경우 소괄소 ( ) 를 생략할 수 있다.
- 매개변수가 없는 경우 소괄호 ( )를 생략할 수 없다.

> 함수 몸체 정의

- 함수 몸체가 하나의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 {}를 생략할 수 있다.
- 함수 몸체 내부의 문이 값으로 평가될 수 있는 표현식인 문이라면 암묵적으로 반환된다. 하지만 표현식인 문이 아니라면 에러가 발생한다.
- 표현식인 문이 아니라면 함수 몸체가 하나의 문으로 구성된다 해도 중괄호{}를 생략할 수 없다.
- 객체 리터럴을 반환하는 경우 객체 리터럴을 소괄호 ( )로 감싸주어야 한다.
- 객체 리터럴을 소괄호()로 감싸지 않으면 객체 리터럴의 중괄호를 함수 몸체를 감싸는 중괄호로 잘못 해석한다.
- 함수 몸체가 여러개의 문으로 구성된다면 중괄호 {}를 생략할 수 없다. 이때 반환값이 있다면 명시적으로 반환해야 한다.
- 화살표 함수도 즉시 실행 함수로 사용할 수 있다.
- 화살표 함수도 일급 객체이므로 고차 함수에 인수로 전달할 수 있다.
- 화살표 함수는 콜백 함수로서 정의할 때 유용하다.

### 예제26-11

```javascript
const multiply = (x, y) => x \* y;
multiply(2, 3); // -> 6
```

### 예제26-12

```javascript
const arrow = (x, y) => { ... };
```

### 예제26-13

```javascript
const arrow = x => { ... };
```

### 예제26-14

```javascript
const arrow = () => { ... };
```

### 예제26-15

```javascript
// concise body
const power = x => x \*\* 2;
power(2); // -> 4

// 위 표현은 다음과 동일하다.
// block body
const power = x => { return x \*\* 2; };
```

### 예제26-16

```javascript
const arrow = () => const x = 1; // SyntaxError: Unexpected token 'const'

// 위 표현은 다음과 같이 해석된다.
const arrow = () => { return const x = 1; };
```

### 예제26-17

```javascript
const arrow = () => {
  const x = 1;
};
```

### 예제26-18

```javascript
const create = (id, content) => ({ id, content });
create(1, "JavaScript"); // -> {id: 1, content: "JavaScript"}

// 위 표현은 다음과 동일하다.
const create = (id, content) => {
  return { id, content };
};
```

### 예제26-19

```javascript
// { id, content }를 함수 몸체 내의 쉼표 연산자문으로 해석한다.
const create = (id, content) => {
  id, content;
};
create(1, "JavaScript"); // -> undefined
```

### 예제26-20

```javascript
const sum = (a, b) => {
  const result = a + b;
  return result;
};
```

### 예제26-21

```javascript
const person = ((name) => ({
  sayHi() {
    return `Hi? My name is ${name}.`;
  },
}))("Lee");

console.log(person.sayHi()); // Hi? My name is Lee.
```

### 예제26-22

```javascript
// ES5
[1, 2, 3].map(function (v) {
return v \* 2;
});

// ES6
[1, 2, 3].map(v => v \* 2); // -> [ 2, 4, 6 ]
```

### 26.3.2 화살표 함수와 일반 함수의 차이

> 01.화살표 함수는 인스턴스를 생성할 수 없는 non-constructor다.

- 화살표 함수는 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.

> 02.중복된 매개변수 이름을 선언할 수 없다.

- 일반 함수는 중복된 매개변수 이름을 선언해도 에러가 발생하지 않는다. 단 strict mode에서 선언하면 에러가 발생함
- 화살표 함수에서도 중복된 매개변수 이름을 선언하면 에러가 발생한다.

> 03.화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩 갖지 않는다.

- 따라서 화살표 함수 내부에서 this, arguments, super, new.target을 참조하면 스코프 체인을 통해 상위 스코프의 this, arguments, super, new.target을 참조한다.
- 화살표 함수가 중첩되어 있다면 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 this, arguments, super, new.target을 참조한다.

### 26.3.3 this

- 화살표 함수가 일반 함수와 구별되는 가장 큰 특징은 바로 this다.
- 그리고 화살표 함수는 다른 함수의 인수로 전달되어 콜백 함수로 사용되는 경우가 많다.
- 일반 함수로서 호출되는 모든 함수 내부의 this는 전역 객체를 가리킨다. 그런데 클래스 내부의 모든 코드에는 strict mode가 암묵적으로 적용된다.
- 따라서 strict mode에서 일반 함수로서 호출된 모든 함수 내부의 this에는 전역 객체가 아니라 undefined가 바인딩되므로 일반함수로 호출되는 map 메서드의 콜백 함수 내부의 this에는 undefined가 바인딩된다.
- 이때 발생하는 문제가 콜백 함수 내부의 this 문제다.
- ES6에서는 화살표 함수를 사용하여 "콜백 함수 내부의 this 문제"를 해결할 수 있다.
- 화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다. 이를 lexical this라 한다.
- 화살표 함수를 제외한 모든 함수에는 this 바인딩이 반드시 존재한다.
- 따라서 화살표 함수 내부에서 this를 참조하면 일반적인 식별자처럼 스코프 체인을 통해 상위 스코프에서 this를 탐색한다.
- 만약 화살표 함수가 전역 함수라면 화살표 함수의 this는 전역 객체를 가리키낟.
- 프로퍼티에 할당한 화살표 함수도 스코프 체인상에서 가장 가까운 삼위 함수 중에서 화살표 함수가 아닌 함수의 this를 참조한다.
- 메서드를 정의할 떄는 화살표 함수보다는 ES6 메서드 축약 표현으로 정의하는 ES6 메서드를 사용하는 것이 좋다.
- 프로토타입 객체의 프로파티에 화살표 함수를 할당하는 경우도 화살표 함수 내부의 this가 전역 객체를 가리키는 문제가 발생한다.
- 프로퍼티를 동적 추가할 때는 ES6 메서드 정의를 사용할 수 없으므로 일반 함수를 할당한다.
- 클레스 필드 정의 제안을 사용하여 클래스 필드에 화살표 함수를 할당할 수 있다.
- 화살표 함수 내부에서 참조한 this는 constructor내부의 this 바인딩과 같다. this 바인딩은 클래스가 생성한 이스턴스를 가리킨다. 하지만 클래스 필드에 할당한 화살표 함수는 프로토타입 메서드가 아니라 인스턴스 메서드가 된다.
- 따라서 메서드를 정의할 때는 ES6 메서드 축약 표현으로 정의한 ES6메서드를 사용하는 것이 좋다.

### 예제26-28

```javascript
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    // add 메서드는 인수로 전달된 배열 arr을 순회하며 배열의 모든 요소에 prefix를 추가한다.
    // ①
    return arr.map(function (item) {
      return this.prefix + item; // ②
      // -> TypeError: Cannot read property 'prefix' of undefined
    });
  }
}

const prefixer = new Prefixer("-webkit-");
console.log(prefixer.add(["transition", "user-select"]));
```

### 예제26-32

```javascript
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    return arr.map((item) => this.prefix + item);
  }
}

const prefixer = new Prefixer("-webkit-");
console.log(prefixer.add(["transition", "user-select"]));
// ['-webkit-transition', '-webkit-user-select']
```

### 예제26-33

```javascript
// 화살표 함수는 상위 스코프의 this를 참조한다.
() => this.x;

// 익명 함수에 상위 스코프의 this를 주입한다. 위 화살표 함수와 동일하게 동작한다.
(function () {
  return this.x;
}.bind(this));
```

### 예제26-40

```javascript
// Good
const person = {
  name: "Lee",
  sayHi() {
    console.log(`Hi ${this.name}`);
  },
};

person.sayHi(); // Hi Lee
```

### 예제26-41

```javascript
// Bad
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = () => console.log(`Hi ${this.name}`);

const person = new Person("Lee");
// 이 예제를 브라우저에서 실행하면 this.name은 빈 문자열을 갖는 window.name과 같다.
person.sayHi(); // Hi
```

### 예제26-42

```javascript
// Good
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log(`Hi ${this.name}`);
};

const person = new Person("Lee");
person.sayHi(); // Hi Lee
```

### 26.3.4 super

- 화살표 함수는 함수 자체의super 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 super를 참조하면 this와 마찬가지로 상위 스코프의 super를 참조한다.
- super는 내부 슬롯[[HomeObject]]를 갖는 ES6메서드 내에서만 사용할 수 있는 키워드다.
- 화살표 함수는 ES6메서드는 아니지만 함수 자체의shper바인딩을 갖지 않으므로 super를 참조해도 에러가 발생하지 않고 상위 스코프인 constructor의 super바인딩을 참조한다.

### 예제26-47

```javascript
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

class Derived extends Base {
  // 화살표 함수의 super는 상위 스코프인 constructor의 super를 가리킨다.
  sayHi = () => `${super.sayHi()} how are you doing?`;
}

const derived = new Derived("Lee");
console.log(derived.sayHi()); // Hi! Lee how are you doing?
```

### 26.3.5 arguments

```javascript
- 화살표 함수는 함수 자체의 arguments바인딩을 갖지않는다.
- 따라서 화살표 함수 내부에서 arguments를 참조하면 this와 마찬가지로 상위 스코프의 arguments를 참조한다.
- 화살표 함수로 가변인자 함수를 구현해야 할 때는 반드시 Rest 파라미터를 사용해야한다.
```

### 예제26-48

```javascript
(function () {
  // 화살표 함수 foo의 arguments는 상위 스코프인 즉시 실행 함수의 arguments를 가리킨다.
  const foo = () => console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
  foo(3, 4);
})(1, 2);

// 화살표 함수 foo의 arguments는 상위 스코프인 전역의 arguments를 가리킨다.
// 하지만 전역에는 arguments 객체가 존재하지 않는다. arguments 객체는 함수 내부에서만 유효하다.
const foo = () => console.log(arguments);
foo(1, 2); // ReferenceError: arguments is not defined
```

<!-- Line -->

---

## 26.4 Rest 파라미터

### 26.4.1 기본 문법

- Rest 파라미터는 매개변수 이름 앞에 세개의 점 ...을 붙여서 정의한 매개변수를 의미한다.
- Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.
- 일반 매개변수와 Rest 파라미터는 함꼐 사용할 수 있다. 전달된 인수는 순차적으로 할당된다.
- Rest 파라미터는 이름 그래도 나머지 인수들로 구성된 배열이 할당된다. 따라서 Rest 파라미터는 반드시 마지막 파라미터이어야 한다.
- Rest 파라미터는 단하나만 선언할 수 있다.
- Rest 파라미터는 함수 정의시 선언한 매개변수 개수를 나타내는 함수 객체의 length프로퍼티에 영향을 주지 않는다.

### 예제26-49

```javascript
function foo(...rest) {
  // 매개변수 rest는 인수들의 목록을 배열로 전달받는 Rest 파라미터다.
  console.log(rest); // [ 1, 2, 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5);
```

### 예제26-50

```javascript
function foo(param, ...rest) {
  console.log(param); // 1
  console.log(rest); // [ 2, 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5);

function bar(param1, param2, ...rest) {
  console.log(param1); // 1
  console.log(param2); // 2
  console.log(rest); // [ 3, 4, 5 ]
}

bar(1, 2, 3, 4, 5);
```

### 예제26-51

```javascript
function foo(...rest, param1, param2) { }

foo(1, 2, 3, 4, 5);
// SyntaxError: Rest parameter must be last formal parameter
```

### 예제26-52

```javascript
function foo(...rest1, ...rest2) { }

foo(1, 2, 3, 4, 5);
// SyntaxError: Rest parameter must be last formal parameter
```

### 예제26-53

```javascript
function foo(...rest) {}
console.log(foo.length); // 0

function bar(x, ...rest) {}
console.log(bar.length); // 1

function baz(x, y, ...rest) {}
console.log(baz.length); // 2
```

### 26.4.2 Rest 파라미터와 arguments 객체

- ES5에서는 함수의 정의할 때 매개변수의 개수를 확정할 수 없는 가변 인자 함수의 경우 매개변수를 통해 인수를 전달받는 것이 불가능하므로 arguments 객체를 활용하여 인수를 전달받았다.
- arguments 객체는 유사 배열 객체이며, 함수 내부에서 지역 변수처럼 사용할 수 있다.
- ES6에서는 rest 파라미터를 사용하여 가변 인자 함수의 인수 목록을 배열로 직접 전달받을 수 있다.
- 이를 통해 arguments 객체를 배열로 변환하는 번거로움을 피할 수 있다.
- 함수와 ES6메서드는 Rest파라미터와 arguments객체들 모두 사용할 수 있다.
- 하지만 화살표 함수는 arguments객체를 갖지 않으므로 가변 인자 함수를 구현해야 할 때는 반드시 Rest 파라미터를 사용해야 한다.

### 예제26-56

```javascript
function sum(...args) {
  // Rest 파라미터 args에는 배열 [1, 2, 3, 4, 5]가 할당된다.
  return args.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

<!-- Line -->

---

## 26.5 매개변수 기본값

- 자바스크립트 엔진이 매개변수의 개수와 인수의 개수를 체크하지 않는다.
- 인수가 전달되지 않은 매개변수의 값은 undefined다.
- 이를 방치하면 의도치 않은 결과를 초래할 수 있기 때문에 매개변수에 기본값을 할당할 필요가 있다. 즉 방어 코드가 필요하다.
- ES6에서 도입된 매개변수 기본값을 사용하면 함수 내에서 수행하던 인수 체크 및 초기화를 간소화할 수 있다.
- 매개변수 기본값은 매개변수에 인수를 전달하지 않은 경우와undefined를 전달한 경우에만 유효하다.
- 앞서 살펴본 Rest 파라미터에는 기본값을 지정할 수 없다.
- 매개변수 기본값은 함수 정의 시 선언한 매개변수 개수를 나타내는 함수객체의 length 프로퍼티와 arguments 객체에 아무런 영향을 주지 않는다.

### 예제26-57

```javascript
function sum(x, y) {
  return x + y;
}

console.log(sum(1)); // NaN
```

### 예제26-58

```javascript
function sum(x, y) {
  // 인수가 전달되지 않아 매개변수의 값이 undefined인 경우 기본값을 할당한다.
  x = x || 0;
  y = y || 0;

  return x + y;
}

console.log(sum(1, 2)); // 3
console.log(sum(1)); // 1
```

### 예제26-59

```javascript
function sum(x = 0, y = 0) {
  return x + y;
}

console.log(sum(1, 2)); // 3
console.log(sum(1)); // 1
```

### 예제26-60

```javascript
function logName(name = "Lee") {
  console.log(name);
}

logName(); // Lee
logName(undefined); // Lee
logName(null); // null
```

### 예제26-61

```javascript
function foo(...rest = []) {
console.log(rest);
}
// SyntaxError: Rest parameter may not have a default initializer
```

### 예제26-62

```javascript
function sum(x, y = 0) {
  console.log(arguments);
}

console.log(sum.length); // 1

sum(1); // Arguments { '0': 1 }
sum(1, 2); // Arguments { '0': 1, '1': 2 }
```
