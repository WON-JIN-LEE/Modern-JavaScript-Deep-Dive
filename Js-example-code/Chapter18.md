# 18장 함수와 일급 객체

## 18.1 일급 객체

- 자바스크립트의 함수는 아래의 조건을 모두 만족하므로 일급객체다.
- 객체는 값이므로 함수는 값과 동일하게 취급할 수 있다.
- 함수형 프로그래밍을 가능케 하는 자바스크립트의 장점중 하나다.
- 함수 객체는 일반 객체에 없는 함수 고유의 프로퍼티를 소유한다.

다음 조건을 만족하는 객체를 일급 객체라 한다.

- 1.무명의 리터럴로 생성할 수 있다. 즉 런타임에 생성이 가능하다.
- 2.변수나 자료구조(객체, 배열등)에 저장할 수 있다.
- 3.함수의 매개변수에 전달할 수 있다.
- 4.함수의 반환값으로 사용할 수 있다.

### 예제 18 - 01

```javascript
// 1. 함수는 무명의 리터럴로 생성할 수 있다.
// 2. 함수는 변수에 저장할 수 있다. 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function (num) {
  return ++num;
};

const decrease = function (num) {
  return --num;
};

// 2. 함수는 객체에 저장할 수 있다.
const predicates = {
  increase,
  decrease,
};

// 3. 함수의 매개변수에게 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.
function makeCounter(predicate) {
  let num = 0;

  return function () {
    num = predicate(num);
    return num;
  };
}

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const increaser = makeCounter(predicates.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const decreaser = makeCounter(predicates.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

<!-- Line -->

---

## 18.2 함수 객체의 프로퍼티

- arguments, caller, length, name, prototype 프로퍼티는 모두 함수 객체의 데이터 프로퍼티다. 이는 일반 객체에는 없는 함수 객체 고유의 프로퍼티다.
- 하지만 \_ _ proto _ \_ 는 접근자 프로퍼티이며, 함수 객체 고유의 프로퍼티가 아니라 Object.prototype 객체의 프로퍼티를 상속받은 것이다.
- 즉, Object.prototype 객체의 \_ _ proto _ \_ 접근자 프로퍼티는 모든 객체가 사용할 수 있다.

### 18.2.1 arguments 프로퍼티

- 함수 객체의 arguments프로퍼티 값은 arguments 객체다.
- arguments 객체는 함수 호출 시 전달된 인수(argument)등의 정보를 담고 있는 순회 가능한 유사 배열 객체다.
- 즉, 함수 외부에서는 참조할 수 없는 함수 내부의 지역 변수처럼 사용된다.
- JS는 함수의 매개변수와 인수릐 개수가 일치하는지 확인하지 않기 때문에 매개변수 개수만큼 인수를 전달하지 않아도 에러가 발생하지 않는다.
- 함수가 호출되면 함수 몸체 내에서 암묵적으로 매개변수가 선언되고 undefined로 초기화된 이후 인수가 할당된다.
- 매개 변수보다 적개 인수를 전달하면 인수가 전달되지 않는 매개변수는 undefined를 유지한다. -매개변수보다 더 많이 인수를 전달하면 초과된 인수는 무시된다. 그리고 초과된 인수는 arguments 객체의 프로퍼티로 보관된다.
- arguments 객체는 인수를 프로퍼티 값으로 소유하며 프로퍼티 키는 인수의 순서를 나타낸다.
- arguments 객체의 callee프로퍼티는 호출되어 arguments 객체를 생성한 함수, 즉 함수 자신을 가리킨다.
- arguments 객체의 length 프로퍼티는 인수의 개수를 가리킨다.
- arguments 객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다.
- 유사 배열 객체와 이터러블 : ES6에서 도입된 이터레이션 프로토콜을 준수하면 순회 가능한 자료구조인 이터러블이 된다. ES6부터 arguments 객체는 유사 배열 객체 이면서 동시에 이터러블이다.
- 유사 배열 객체는 배열이 아니므로 배열 메서드를 사용할 경우 에러 발생한다.
- 에러 등 이러한 번거로움을 해결하기 위해ES6에서 Rest 파라미터를 토입했다.

### 예제 18 - 06

```javascript
function sum() {
    let res = 0;

    // arguments 객체는 length 프로퍼티가 있는 유사 배열 객체이므로 for 문으로 순회할 수 있다.
    for (let i = 0; i < arguments.length; i++) {
        res += arguments[i];
    }

    return res;
}

console.log(sum()); // 0
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3)); // 6

### 예제 18 - 08
// ES6 Rest parameter
function sum(...args) {
    return args.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```

### 18.2.2 caller프로퍼티

- caller프로퍼티는 ECMAScript사양에 포함되지 않은 비표준 프로퍼티다. -함수 객체의caller프로퍼티는 함수 자신을 호출한 함수를 가리킨다.

### 예제 18 - 09

```javascript
function foo(func) {
  return func();
}

function bar() {
  return "caller : " + bar.caller;
}

// 브라우저에서의 실행한 결과
console.log(foo(bar)); // caller : function foo(func) {...}
console.log(bar()); // caller : null
```

### 18.2.3 length 프로퍼티

- 함수 객체는 length프로퍼티는 함수를 정의할 때 선언한 매개변수의 개수를 가리킨다.
- arguments 객체의 length프로퍼티와 함수 객체의 length프로퍼티의 값은 다를 수 있으므로 주의해야 한다.
- arguments 객체의 length프로퍼티는 인수의 개수를 가리키고, 함수 객체의 length프로퍼티는 매개변수의 개수를 가리킨다.

### 예제 18 - 10

```javascript
function foo() {}
console.log(foo.length); // 0

function bar(x) {
  return x;
}
console.log(bar.length); // 1

function baz(x, y) {
  return x * y;
}
console.log(baz.length); // 2
```

### 18.2.4 name 프로퍼티

- 함수 객체의 name프로퍼티는 함수 이름을 나타낸다.
- ES5에서 name 프로퍼티는 빈 문자열을 값으로 갖는다.
- ES6에서는 기명함수면 함수이름을 나타내고, 무명함수일때 함수 객체를 가리키는 식별자를 값으로 갖는다.

### 예제 18 - 11

```javascript
// 기명 함수 표현식
var namedFunc = function foo() {};
console.log(namedFunc.name); // foo

// 익명 함수 표현식
var anonymousFunc = function () {};
// ES5: name 프로퍼티는 빈 문자열을 값으로 갖는다. ES6: name 프로퍼티는 함수 객체를 가리키는 변수 이름을 값으로 갖는다.
console.log(anonymousFunc.name); // anonymousFunc

// 함수 선언문(Function declaration)
function bar() {}
console.log(bar.name); // bar
```

### 18.2.5 \_ _ proto _ \_ 접근자 프로퍼티

- 모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖는다.
- [[Prototype]]내부슬롯은 객체지향 프로그래밍의 상송을 구현하는 프로토타입 객체를 가리킨다.
- \_ _ proto _ \_ 프로퍼티는 [[Prototype]]내부슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티다.
- [[Prototype]] 내부슬롯에 \_ _ proto _ \_ 접근자 프로퍼티를 통해 간접적으로 프로토타입 객체에 접근할 수 있다.

### 예제 18 - 12

```javascript
const obj = {
  a: 1,
};

// 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
console.log(obj.__proto__ === Object.prototype); // true

// 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받는다. hasOwnProperty
// 메서드는 Object.prototype의 메서드다.
console.log(obj.hasOwnProperty("a")); // true
console.log(obj.hasOwnProperty("__proto__")); // false
```

### 18.2.6 prototype 프로퍼티

- prototype 프로퍼티는 생성자 함수로 호출할 수 있는 함수 객체, 즉 constructor만이 소유하는 프로퍼티다. non-constructor에는 없다.
- prototype 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 호출될 때 생성자 함수가 생성할 객체(인스턴스)의 프로토타입 객체를 가리킨다.

### 예제 18 - 13

```javascript
// 함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}.hasOwnProperty("prototype")); // -> true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}.hasOwnProperty("prototype")); // -> false
```
