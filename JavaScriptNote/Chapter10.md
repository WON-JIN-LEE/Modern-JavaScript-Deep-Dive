# 10장 객체 리터럴

## 10.1 객체란?

    -원시 값을 제외한 나머지 값은 모두 객체다.
    -원시 타입의 값, 즉 원시 값은 변경불가능한 값이지만 객체 타입의 값, 즉 객체는 변경 가능한 값이다.
    -객체는 0개 이상의 프로퍼티로 구성된 집합이며, 프로퍼티는 키와 값으로 구성된다.
    -프로퍼티 값이 함수일 경우, 일반 함수와 구분하기 위해 메서드라 부른다
    -프로퍼티 : 객체의 상태를 나타내는 값
    -메서드 : 프로퍼티를 참조하고 조작 할 수 있는 동작

## 10.2 객체 리터널에 의한 객체 생성

    -자바스크립트는 프로토타입 기반 객체지향 언어로서 클래스 기반 객체지향 언어와는 달리 다양 객체 생성 방법을 지원한다.
    -방법 : 객체 리터럴 / Object 생성자 함수 / 생성자 함수 / Object.create 메서드 / 클래스(ES6)
    -객체 리터럴은 중괄호({…}) 내에 0개 이상의 프로퍼티를 정의한다. 만약 중괄호 내에 프로퍼티를 정의하지 않으면 빈 객체가 생성된다.
    -객체 리터럴에 프로퍼티를 포함시켜 객체를 생성함과 동시에 프로퍼티를 만들 수도 있고, 객체를 생성한 이후에 프로퍼티를 동으로 추가할 수 있다.

## 10.3 프로퍼티

    -객체는 프로퍼티의 집합이며, 프로퍼티는 키와 값으로 구성된다.
    -프로퍼티를 나열할 때는 쉽표로 구분한다.
    -프로퍼티 키 : 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
    -프로퍼티 값 : 자바스크립트에서 사용할 수 있는 모든 값
    -프로퍼티 키는 프로퍼티 값에 접근할 수 있는 식별자 역할을 한다.
    -식별자 네이밍 규칙을 따르지 않는 이름에는 반드시 따옴표를 사용해야 한다.
    -문자열 또는 문자열로 평가할 수 있는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수도 있다. 이경우 키로 사용할 표현식을 대괄호([…])로 묶어야 한다.
    -프로퍼티 키에 문자열이나 심벌 값 외의 값을 사용하면 암묵적 타입 변환을 통해 문자열이 된다.
    -예약어를 프로퍼티 키로 사용해도 에러가 발생하지 않는다. 사용을 권장하지는 않는다.
    -이미 존재하는 프로퍼티 키를 중복 선언하면 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어쓴다.

### 예제 10-03

```javascript
var person = {
  //프로퍼티 키는 name,프로퍼티 값은  'lee'
  name: "lee",
  //프로퍼티 키는 age,프로퍼티 값은  20
  age: 20,
};
```

### 예제 10-04

```javascript
var person = {
  //식별자 네이밍 규칙을 준수하는 프로퍼티 키
  firstName: "Ung-mo",
  //식별자 네이밍 규칙을 준수하지 않은 프로퍼티 키
  "last-name": "Lee",
};
console.log(person); // {firsrName: "Ung-mo", last-name : "Lee"}
```

### 예제 10-06

```javascript
var obj = {};
var key = "hello";

//ES5 : 프로퍼티 키 동적 생성
obj[key] = "world";
//ES6 계산된 프로퍼티 이름
//var obj={[key]: 'world'};

console.log(obj); // {hello: "world"}
```

### 예제 10-10

```javascript
var foo = {
  name: "Lee",
  name: "kim",
};
```

## 10.4 메서드

    -프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해 메서드라 부른다. 즉 객체에 묶여 있는 함수를 의미한다.

### 예제 10-11

```javascript
var circle = {
  radius: 5,
  getDiameter: function () {
    return 2 * this.radius;
  },
};

console.log(circle.getDiameter()); // 10
```

### 예제 10-12

```javascript
var person = {
  name: "lee",
};

console.log(person.name); // Lee
console.log(person["name"]);
```

## 10.5 프로퍼티 접근

    -두가지 방법이 있다, 1. 접근 연산자(.)를 사용하는 마침표 표기법 / 2. 접근 연산자([ … ])를 사용하는 대괄호 표기법
    -대괄호 표기법을 사용하는 경우 대괄호 프로퍼티 접근 연산자 내부에 지정하는 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 한다.
    -따옴표로 감싸지 않은 이름을 프로퍼티 키로 사용하면 자바스크립트 엔진은 식별자로 해석한다.
    -객체에 존자하지 않는 프로퍼티에 접근하면 undefined를 반환한다. 이때 ReferenceError가 발생하지 않는데 주의하자
    -프로퍼티 키가 식별자 네이밍 규칙을 지키지 않은 이름이면 반드시 대괄호 표기법을 사용해야 한다. 단. 프로퍼티 키가 숫자로 이뤄진 문자열인 경우 따옴표를 생략할 수 있다. 그 외의 경우 대괄호 내에 들어가는 프로퍼티 키는 반드시 따옴표로 깜사야한다.

## 10.6 프로퍼티 값 갱신

    -이미 존재하는 프러퍼티에 값을 할당하면 프로퍼티 값이 갱신된다.

### 예제 10-16

```javascript
var person = {
  name: "lee",
};
//person객체에 name프로퍼티가 존재하므로 name프로퍼티의 값이 갱신된다.
person.name = "kim";
console.log(person); //{name: "kim"}
```

## 10.7 프로퍼티 동적 생성

    -존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고  프로퍼티 값이 할당된다.

### 예제 10-17

```javascript
var person = {
  name: "lee",
};
//person객체에 age 프로퍼티가 존재하지 않는다.
//따라서 person 객체에 age프로퍼티가 동적으로 생성되고 값이 할당된다.
person.age = 20;
console.log(person); //{name: "kim", age: 20}
```

## 10.8 프로퍼티 삭제

    -delete연산자는 객체의 프로퍼티를 삭제한다.
    -이때 delete연산자의 피연산자는 프로퍼티 값에 접근할 수 있는 표현식이어야 한다.
    -만약 존재하지 않는 프로퍼티를 삭제하면 아무런 에러없이 무시된다.

### 예제 10-18

```javascript
var person = {
  name: "lee",
};

person.age = 20;

//delete 연산자로 age프로퍼티를 삭제할 수 있다.
delete person.age;

//delete 연산자로 address 프로퍼티를 삭제할 수 없다. 이때 에러가 발생하지 않는다.
delete person.address;
```

## 10.9 ES6에서 추가된 객체 리터럴의 확장 기능

## 10.9.1 프로퍼티 축약 표현

    -ES6에서는 프로퍼티 값으로 변수를 사용하는 경우 변수 이름과 프러퍼티 키가 동일한 이름일 때 프로퍼티 키를 생략할 수 있다. 이때 프로퍼티 키는 변수 이름으로 자동 생성된다.

### 예제 10-19

```javascript
//ES5
var x = 1,
  y = 2;

var obj = {
  x: x,
  y: y,
};

console.log(obj); //{x: 1, y: 2}
```

//예제 10-20

```javascript
//ES6
var x = 1,
  y = 2;

var obj = { x, y };

console.log(obj); //{x: 1, y: 2}
```

## 10.9.2 계산된 프로퍼티 이름

    -ES5에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성하려면 객체 리터럴 외부에서 대괄호( [ … ] )표기법을 사용해야 한다.
    -ES6에서는 객체 리터럴 내부에서도 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성할 수 있다.

### 예제 10-21

```javascript
//ES5
var prefix = "prop";
var i = 0;

var obj = {};

obj[prefix + "-" + ++i] = i;
obj[prefix + "-" + ++i] = i;
obj[prefix + "-" + ++i] = i;
console.log(obj); //{prop-1: 1, prop-2: 2, prop-3: 3}
```

### 예제 10-22

```javascript
//ES6
var prefix = "prop";
var i = 0;

var obj = {
  [`${prefix}- ${++i}`]: i,
  [`${prefix}- ${++i}`]: i,
  [`${prefix}- ${++i}`]: i,
};
console.log(obj); //{prop-1: 1, prop-2: 2, prop-3: 3}
```

## 10.9.3 메서드 축약 표현

    -ES5에서 메서드를 정의하려면 프로퍼티 값으로 함수를 할당한다.
    -ES6에서 메서드를 정의할 때 function 키워드를 생략한 축약 표현을 사용할 수 있다.
    -ES6의 메서드 축약 표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작한다.

### 예제 10-23

```javascript
//ES5
var obj = {
  name: "Lee",
  sayHi: function () {
    console.log("Hi!" + this.name);
  },
};

obj.sayHi(); // Hi! Lee
```

### 예제 10-24

```javascript
//ES6
var obj = {
  name: "Lee",
  //메서드 축약표현
  sayHi() {
    console.log("Hi!" + this.name);
  },
};

obj.sayHi(); // Hi! Lee
```