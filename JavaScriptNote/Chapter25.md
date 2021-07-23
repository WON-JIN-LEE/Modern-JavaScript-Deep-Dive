# 25장 클래스

## 25.1 클래스는 프로토타입의 문법적 설탕인가??

- 자바스크립트는 프로토타입 기반 객체지향 언어다.
- 프로토타입 기반 객체지향 언어는 클래스가 필요 없는 객체지향 프로그래밍 언어다.

  > 클래스는 생성자 함수와 매우 유사하게 동작하지만 다음과 같이 몇가지 차이가 있다.

  - 1.클래스를 new연산자 없이 호출하면 에러가 발생한다.
  - 2.클래스는 상속을 지원하는 extends와 super 키워드를 제공한다. 하지만 생성자함수는 지원하지 않는다.
  - 3.클래스는 호이스팅이 발생하지 않는 것처럼 동작한다.
  - 4.클래스 내의 모든 코드에는 암묵적으로 strict mode가 지정되어 실행되면 해제할 수 없다.
  - 5.클래스의 constructor 프로토타입 메서드, 정적 메서드는 모두 프로퍼티 어트리뷰트[[Enumerable]]의 값이 false다. 다시 말해, 열거되지 않는다.

- 클래스는 새로운 객체를 생성 메커니즘으로 보는 것이 합당하다.

<!-- Line -->

---

## 25.2 클래스의 정의

- 클래스 class 키워드를 사용하여 정의한다. 클래스 이름은 파스칼 케이스를 사용하는 것이 일반적이다.
- 표현식으로 클래스를 정의할 수도 있다. 이때 클래스는 함수와 마찬가지로 이름을 가질 수도 있고, 갖지 않을 수도 있다.
- 클래스는 함수다. 따라서 클래스는 값처럼 사용할 수 있는 일급 객체다.
- 클래스 몸체에는 0개 이상의 메서드만 정의할 수 있다.
- 정의 할 수 있는 메서드는 constructor, 프로토타입 메서드, 정적 메서드의 세가지가 있다.

### 25-04

```javascript
// 클래스 선언문
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name; // name 프로퍼티는 public하다.
  }

  // 프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }

  // 정적 메서드
  static sayHello() {
    console.log("Hello!");
  }
}

// 인스턴스 생성
const me = new Person("Lee");

// 인스턴스의 프로퍼티 참조
console.log(me.name); // Lee
// 프로토타입 메서드 호출
me.sayHi(); // Hi! My name is Lee
// 정적 메서드 호출
Person.sayHello(); // Hello!
```

<!-- Line -->

---

## 25.3 클래스 호이스팅

- 클래스 선언문으로 정의한 클래스는 소스코드 평가 과정, 즉 런타임 이전에 먼저 평가되어 함수 객체를 생성한다.
- 단 클래스는 클래서 정의 이전에 참조할 수 없다.
- 클래서 선언문도 변수 선언, 함수 정의와 마찬가지로 호이스팅이 발생한다. 단, 클래스는 let, const 키워드로 선언한 변수처럼 호이스팅된다.
- 따라서 클래스 선언문 이전에 일시적 사각지대에 빠지기 떄문에 호이스팅이 발생하지 않는 것처럼 동작한다.

### 25-06

```javascript
console.log(Person);
// ReferenceError: Cannot access 'Person' before initialization

// 클래스 선언문
class Person {}
```

<!-- Line -->

---

## 25.4 인스턴스 생성

- 클래스는 생성자 함수이며, new연산자와 함께 호출되어 인스턴스를 생성한다.
- 클래스는 인스턴스를 생성하는 것이 유일한 존재 이유이므로 반드시 new연산자와 함께 호출해야 한다.
- 기명 함수 표현식과 마찬가지로 클래스 표현식에서 사용한 클래스 이름은 외부 코드에서 접근 불가능하다.
- 그렇기 때문에 클래스를 가리키는 식별자를 이용해야한다.

### 25-08

```javascript
class Person {}

// 인스턴스 생성
const me = new Person();
console.log(me); // Person {}
```

<!-- Line -->

---

## 25.5 메서드

- 클래스 몸체에는 0개 이상의 메서드만 정의할 수 있다.
- 정의 할 수 있는 메서드는 constructor, 프로토타입 메서드, 정적 메서드의 세가지가 있다.

### 25.5.1 constructor

- constructor는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드다. constructor는 이름을 변경할 수 없다.
- 클래스도 함수 객체 고유의 프로퍼티를 모두 갖고 있다.
- 함수와 동일하게 프로토타입과 연결되어 있으며 자신의 스코프 체인을 구성한다.
- 즉 생성자 함수와 마찬가지로 constructor내부에서 this에 추가한 프로퍼티는 인스턴스 프로퍼티가 된다.
- constructor내부의 this는 클래스가 생성한 인스턴스를 가리킨다.
- constructor는 생성자 함수와 유사하지만 몇가지 차이가 있다.
- constructor는 클래스내에 최대 한개만 존재할 수 있다. 2개이상이명 에러가 발생한다.
- constructor는 생략할 수 있다. 생략하면 클래스에 빈 constructor가 암묵적으로 정의된다. constructor를 생략한 클래스는 빈 객체를 생성한다.
- 프로퍼티가 추가되어 초기화된 인스턴스를 생성하려면 constructor내부에서 this에 인스턴스 프로퍼티를 추가한다.
- 인스턴스를 생성할 때 클래스 외부에서 초기값을 전달하려면 constructor에 매개변수를 선언하고 인스턴스를 생성할 때 초기값을 전달한다.
- constructor는 별도의 반환문을 갖지 않아야 한다. 명시적으로 원시값을 반환하면 원시값 반환은 무시되고 암묵적으로 this가 반환된다.
- 따라서 constructor내부에서 return문을 반드시 생략해야 한다.

### 25-18

```javascript
class Person {
  constructor() {
    // 고정값으로 인스턴스 초기화
    this.name = "Lee";
    this.address = "Seoul";
  }
}

// 인스턴스 프로퍼티가 추가된다.
const me = new Person();
console.log(me); // Person {name: "Lee", address: "Seoul"}
```

### 25-19

```javascript
class Person {
  constructor(name, address) {
    // 인수로 인스턴스 초기화
    this.name = name;
    this.address = address;
  }
}

// 인수로 초기값을 전달한다. 초기값은 constructor에 전달된다.
const me = new Person("Lee", "Seoul");
console.log(me); // Person {name: "Lee", address: "Seoul"}
```

### 25-20

```javascript
class Person {
  constructor(name) {
    this.name = name;

    // 명시적으로 객체를 반환하면 암묵적인 this 반환이 무시된다.
    return {};
  }
}

// constructor에서 명시적으로 반환한 빈 객체가 반환된다.
const me = new Person("Lee");
console.log(me); // {}
```

### 25-21

```javascript
class Person {
  constructor(name) {
    this.name = name;

    // 명시적으로 원시값을 반환하면 원시값 반환은 무시되고 암묵적으로 this가 반환된다.
    return 100;
  }
}

const me = new Person("Lee");
console.log(me); // Person { name: "Lee" }
```

### 25.5.2 프로토타입 메서드

- 클래스 몸체에서 정의한 메서드는 생성자 함수에 의한 객체 생성 방식과는 다르게 클래스의 prototype 프로퍼티에 메서드를 추가하지 않아도 기본적으로 프로토타입 메서드가 된다.
- 인스턴스는 프로토타입 메서드를 상속받아 사용할 수 있다.

### 25-23

```javascript
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }

  // 프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}

const me = new Person("Lee");
me.sayHi(); // Hi! My name is Lee
```

### 25.5.3 정적 메서드

- 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있는 메서드를 말한다.
- 클래스에서는 메서드에 static 키워드를 붙이면 정적 메서드가 된다.
- 정적 메서드는 클래스에 바인딩된 메서드가 된다. 클래스는 함수 객체로 평가되어 자신의 프로퍼티와 메서드를 소유할 수 있다.
- 따라서 정적 메서드는 클래스 정의 이후 인스턴스를 생성하지 않아도 호출할 수 있다.
- 정적 메서드는 인스턴스로 호출할 수 없다. 정적 메서드가 인스턴스의 프로토타입 체인 상에 존재하지 않기 때문이다. 상속받을 수 없다.

### 25-26

```javascript
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }

  // 정적 메서드
  static sayHi() {
    console.log('Hi!');
  }
```

### 25.5.4 정적 메서드와 프로토타입 메서드의 차이

- 1.정적 메서드와 프로토타입 메서드는 자신이 속해 있는 프로토타입 체인이 다르다.
- 2.정적 메서드는 클래스로 호출하고 프로토타입 메서드는 인스턴스로 호출한다.
- 3.정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메서드는 인스턴스 프로퍼티를 참조할 수 있다.
- 메서드 내부에서 인스턴스 프로퍼티를 참조할 필요가 있다면 this를 사용해야 하며, 이러한 경우 프로토타입 메서드로 정의해야 한다.
- 하지만 인스턴스 프로퍼티를 참조할 필요가 없다면 정적 메서드로 정의하는 것이 좋다.

### 25-29

```javascript
class Square {
  // 정적 메서드
  static area(width, height) {
    return width * height;
  }
}

console.log(Square.area(10, 10)); // 100
```

### 25-30

```javascript
class Square {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  // 프로토타입 메서드
  area() {
    return this.width * this.height;
  }
}

const square = new Square(10, 10);
console.log(square.area()); // 100
```

### 25.5.5 클래스에서 정의한 메서드의 특징

> 클래스에서 정의한 메서드는 다음과 같은 특징을 갖는다.

- 1.function키워드를 생략한 메서드 축약 표현을 사용한다.
- 2.객체 리터럴과는 다르게 클래스에 메서드를 정의할 때는 콤마가 필요 없다.
- 3.암묵적으로 strict mode로 실행된다.
- 4.for ... in문이나 Object.keys 메서등으로 열거할 수 없다.
- 5.내부 메서드 [[Construct]]를 갖지 않는 non-constructor다. 따라서 new연산자와 함께 호출할 수 없다.

<!-- Line -->

---

## 25.6 클래스의 인스턴스 생성 과정

- new연산자와 함께 클래스를 호출하면 클래스의 내부 메서드 [[Construct]]가 호출된다. 클래스는 new연산자 없이 호출할 수 없다.

> 1.인스턴스 생성과 this 바인딩

- new연산자와 함께 클래스를 호출하면 constructor의 내부 코드가 실행되기에 앞서 암묵적으로 빈 객체가 생성된다. 이 빈 객체가 바로 클래스가 생성한 인스턴스다.
- 이때 클래스가 생성한 인스턴스의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체가 설정된다.
- 그리고 암묵적으로 생성된 빈 객체, 즉 인스턴스는 this에 바인딩된다. 따라서 constructor내부의 this는 클래스가 생성한 인스턴스를 가리킨다.

> 2.인스턴스 초기화

- constructor의 내부 코드가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다.
- 만약 constructor가 생략되었다면 이과정도 생략된다.

> 3.인스턴스 반환

- 클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

### 25-32

```javascript
class Person {
  // 생성자
  constructor(name) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // Person {}
    console.log(Object.getPrototypeOf(this) === Person.prototype); // true

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.name = name;

    // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
  }
}
```

<!-- Line -->

---

## 25.7 프로퍼티

### 25.7.1 인스턴스 프로퍼티

- 인스턴스 프로퍼티는 constructor내부에서 정의해야한다.
- constructor내부 코드가 실행되기 인전에 constructor내부의 this에는 이미 클래스가 암묵적으로 생성한 인스턴스인 빈 객체가 바인딩되어 있다.
- 이로써 클래스가 암묵적으로 생성한 빈 객체, 즉 인스턴스에 프로퍼티가 추가되어 인스턴스가 초기화된다.
- constructor내부에서 this에 추가한 프로퍼티는 언제나 클래스가 생성한 인스턴스의 프로퍼티가 된다.

### 25.7.2 접근자 프로퍼티

- 접근자 프로퍼티는 자체적으로 값[[Value]]을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티다.
- 접근자 프로퍼티는 클래스에서도 사용할 수 있다.
- 접근자 프로퍼티는 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수, 즉gette함수와 setter함수로 구성되어 있다.
- getter는 메서드 이름 앞에 get 키워드를, setter는 set키워드를 사용해 정의한다.
- 이때 getter와 setter 이름은 인스턴스 프로퍼티처럼 사용된다. 다시말해 호출하는 것이 아니라 참조하는 형식으로 사용한다. 참조 시 내부적으로 호출된다.
- 클래스의 메서드는 기본적으로 프로토타입 메서드가 된다.
- 따라서 클래스의 접근자 프로퍼티 또한 프로토타입의 프로퍼티가 된다.

### 25-36

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // setter 함수
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }
}

const me = new Person("Ungmo", "Lee");

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(`${me.firstName} ${me.lastName}`); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
me.fullName = "Heegun Lee";
console.log(me); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(me.fullName); // Heegun Lee

// fullName은 접근자 프로퍼티다.
// 접근자 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
console.log(Object.getOwnPropertyDescriptor(Person.prototype, "fullName"));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}
```

### 25.7.3 클래스 필드 정의 제안

- 클래스 필드는 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어다.
- 자바스크립트의 클래스에서 인스턴스 프로퍼티를 선언하고 초기화하려면 반드시 constructor내부에서 this에 프로퍼티를 추가해야 한다.
- 또한 자바스크립트의 클래스에서 인스턴스 프로퍼티를 참조하려면 반드시 this를 사용해야 한다.
- 클래스 기반 객체지향 언어의 this는 언제나 클래스가 생성한 인스턴스를 가리킨다.
- 자바스크립트의 클래스 몸체에는 메서드만 선언할 수 있다.
- 클래스 몸체에서 클래스 필드를 정의하는 경우 this에 클래스 필드를 바인딩해서는 안된다.
- this는 클래스의 constructor와 메서드 내에서만 유효한다.
- 자바스크립트에서는 this를 반드시 사용해야 한다.
- 클래스 필드에 초기값을 할당하지 않으면 undefined를 갖는다.
  인스턴스를 생설할 때 외부의 초기값으로 클래스 필드를 초기화해야 할 필요가 있다면 constructor에서 클래스 필드를 초기화해야 한다.
- 즉, 클래스가 생성한 인스턴스에 클래스 필드에 해당하는 프로퍼티가 없다면 자동으로 추가되기 때문이다.
- 함수는 일급객체이므로 클래스 필드를 통해 메서드를 정의할 수도 있다.
- 이처럼 클래스 필드에 함수를 할당하는 경우, 이함수는 프로토타입 메서드가 아닌 인스턴스 메서드가 된다. 따라서 클래스 필드에 함수를 할당하는 것은 권장하지 않는다.
- 인스턴스를 생성할 때 외부 초기값으로 클래스 필드를 초기화할 필요가 있다면 constructor에서 인스턴스 프로퍼티를 정의한다.
- 필요없다면 constructor에서 정의하는 방식과 클래스 필드 정의 제안을 사용할 수 있다.

### 25-46

```javascript
class Person {
  // 클래스 필드에 문자열을 할당
  name = "Lee";

  // 클래스 필드에 함수를 할당
  getName = function () {
    return this.name;
  };
  // 화살표 함수로 정의할 수도 있다.
  // getName = () => this.name;
}

const me = new Person();
console.log(me); // Person {name: "Lee", getName: ƒ}
console.log(me.getName()); // Lee
```

### 25.7.4 private 필드 정의 제안

- 자바스크립트는 캡슐화를 완전하게 지원하지 않는다. 따라서 인스턴스 프로퍼티는 인스턴스를 통해 클래스 외부에서 언제나 참조할 수 있다.
- 2021년 1월, TC39프로세스의 stage 3에는 private필드를 정의할 수 있는 새로운 표준 사양이 제안되어있다.
- private필드의 선두에는 # 을 붙여준다. private필드를 참조할 때도 #을 붙여주어야 한다.
- public필드는 어디서든 참조할 수 있지만 private필드는 클래스 내부에서만 참조할 수 있다.
- private 필드는 반드시 클래스 몸체에 정의해야 한다. private 필드를 직접 constructor에 정의하면 에러가 발생한다.

### 25-50

```javascript
class Person {
  // private 필드 정의
  #name = "";

  constructor(name) {
    // private 필드 참조
    this.#name = name;
  }
}

const me = new Person("Lee");

// private 필드 #name은 클래스 외부에서 참조할 수 없다.
console.log(me.#name);
// SyntaxError: Private field '#name' must be declared in an enclosing class
```

### 25.7.5 static 필드 정의 제안

- static 키워드를 사용하여 정적 메서드를 정의할 수 있다.
- 하지만 static 키워드를 사용하며 정적 필드를 정의할 수는 없었다.
- 최근 static public 필드, static private 필드, static private 메서드를 정의할 수 있는 새로운 표준사양이 제안되어 있다.

### 25-53

```javascript
class MyMath {
  // static public 필드 정의
  static PI = 22 / 7;

  // static private 필드 정의
  static #num = 10;

  // static 메서드
  static increment() {
    return ++MyMath.#num;
  }
}

console.log(MyMath.PI); // 3.142857142857143
console.log(MyMath.increment()); // 11
```

<!-- Line -->

---

## 25.8 상속에 의한 클래스 확장

### 25.8.1 클래스 상속과 생성자 함수 상속

- 상속에 의한 클래스 확장은 기존 클래스를 상속받아 새로운 클래스를 확장하여 정의하는 것이다.
- 클래스는 상속을 통해 다른 클래스를 확장할 수 있는 문법인 extends키워드가 기본적으로 제공된다. extends키워드를 사용한 클랫 확장은 간편하고 직관적이다.
- 하지만 생성자 함수는 클래스처럼 확장할 수 있는 문법을 제공하지 않는다.

### 25.8.2 extends 키워드

- 상속을 통해 클래스를 확장하려면 extends 키워드를 사용하여 상속받을 클래스를 정의한다.
- 상속을 통해 확장된 클래스를 서브클래스 라고 부른다. 서브클래스를 파생 클래스 또는 자식 클래스라고도 한다.
- 서브 클래스에게 상속된 클래스를 슈퍼클래스 라고 부른다. 또한 베이스 클래스, 부모 클래스 라고 부르기도 한다.
- 슈퍼클래스와 서브클래스는 인스턴스 프로토타입 체인뿐 아니라 클래스 간의 프로토타입 체인도 생성한다.
- 이를 통해 프로토타입 메서드와 정적 메서드 모두 상속 가능하다.

### 25-56

```javascript
// 수퍼(베이스/부모)클래스
class Base {}

// 서브(파생/자식)클래스
class Derived extends Base {}
```

### 25.8.3 동적 상속

- extends 키워드는 클래스뿐만 아니라 생성자 함수도 상속받아 클래슬 확장할 수 있다. 단, extends 키워드 앞에는 반드시 클래스가 와야 한다.
- extends키워드 다음에는 클래스뿐만 아니라 [[Construct]] 내부 메서드를 갖는 함수 객체로 평가될 수 있는 모든 표현식을 사용할 수 있다.

### 25-57

```javascript
// 생성자 함수
function Base(a) {
  this.a = a;
}

// 생성자 함수를 상속받는 서브클래스
class Derived extends Base {}

const derived = new Derived(1);
console.log(derived); // Derived {a: 1}
```

### 25-58

```javascript
function Base1() {}

class Base2 {}

let condition = true;

// 조건에 따라 동적으로 상속 대상을 결정하는 서브클래스
class Derived extends (condition ? Base1 : Base2) {}

const derived = new Derived();
console.log(derived); // Derived {}

console.log(derived instanceof Base1); // true
console.log(derived instanceof Base2); // false
```

### 25.8.4 서브클래스의 constructor

- 서브클래스에서 constructor를 생략하면 클래스에 다음과 같은 constructor가 암묵적으로 생성된다. args는 new연산자와 함께 클래스가 호출할 때 전달한 인수의 리스트다.
- super()는 슈퍼클래스의 constructor를 호출하여 인스턴스를 생성한다.
- 슈퍼클래스와 서브클래스 모두 constructor를 생략하면 암묵적으로 모두 빈 객체가 생성된다.
- 프로퍼티를 소유하는 인스턴스를 생성하려면 constructor내부에서 인스턴스에 프로퍼티를 추가해야 한다.

- Rest 파라미터 : 매개변수에 ...을 붙이면 Rest 파라미터가 된다. Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.

### 25-62

```javascript
// 수퍼클래스
class Base {
  constructor() {}
}

// 서브클래스
class Derived extends Base {
  constructor() {
    super();
  }
}

const derived = new Derived();
console.log(derived); // Derived {}
```

### 25.8.5 super 키워드

- super 키워드는 함수처럼 호출할 수도 있고 this와 같이 식별자처럼 참조할 수 있는 특수한 키워드다.

> super 호출

- super를 호출하면 슈퍼클래스의 constructor를 호출한다.
- 슈퍼클래스의 constructor 내부에서 추가한 프로퍼티를 그대로 갖는 인스턴스를 생성한다면 서브클래스의 constructor를 생략할 수 있다.
- 이때 new연산자와 함께 서브클래스를 호출하면서 전달한 인수는 모두 서브클래스에 암묵적으로 정의된 constructor의 super 호출을 통해 슈퍼클래스의 constructor에 전달된다.

> super 호출할 때 주의사항

- 1.서브클래스에서 constructor를 생략하지 않은 경우 서브클래스의 constructor에서는 반드시 super를 호출해야한다.
- 2.서브클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없다.
- 3.super는 반드시 서브 클래스의 constructor에서만 호출한다. 서브클래스가 아닌 클래스의 constructor나 함수에서 super를 호출하면 에러가 발생한다.

> super 참조

- 메서드 내에서 super를 참조하면 슈퍼클래스의 메서드를 호출할 수 있다.
- [[HomeObject]]를 가지는 함수만이 super 참조를 할 수 있다.
- 주의할 것은 ES6의 메서드 축약 표현으로 정의된 함수만이 [[HomeObject]]를 갖는다는 것이다.
- 단, super참조는 슈퍼클래스의 메서드를 참조하기 위해 사용하므로 서브클래스의 메서드에서 사용해야 한다.

### 25-63

```javascript
// 수퍼클래스
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

// 서브클래스
class Derived extends Base {
  // 다음과 같이 암묵적으로 constructor가 정의된다.
  // constructor(...args) { super(...args); }
}

const derived = new Derived(1, 2);
console.log(derived); // Derived {a: 1, b: 2}
```

<!-- Line -->

---

### 25.8.6 상속 클래스의 인스턴스 생성 과정

> 1.서브클래스의 super 호출

- 자바스크립트 엔진은 클래스를 평가할 때 슈퍼클래스와 서브클래스를 구분하기 위해 "base" 또는 "derived"를 값으로 갖는 내부 슬롯 [[ConstructorKind]]를 갖는다.
- 다른 클래스를 상속받지 않는 클래스는 내부 슬롯 [[ConstructorKind]]의 값이 "base"이고 상속받는 서브클래스는 내부 슬롯 [[ConstructorKind]]의 값이 "derived"로 설정된다.
- 서브클래스는 자신이 직접 인스턴스를 생성하지 않고 슈퍼클래스에게 인스턴스 생성을 위임한다.
- 이것은 바로 서브클래스의 constructor에서 반드시 super를 호출해야 하는 이유다.
- 만약 서브클래스 constructor 내부에 super호출이 없으면 에러가 발생한다.
- 실제로 인스턴스를 생성하는 주체는 슈퍼클래스이므로 super호출하지 않으면 인스턴스를 생성할 수 없다.

> 2.슈퍼클래스의 인스턴스 생성과 this 바인딩

- 슈퍼클래스의 constructor 내부의 코드가 실행되기 이전에 암묵적으로 빈 객체를 생성한다.
- 이 빈 객체가 바로 클래스가 생성한 인스턴스다. 그리고 암묵적으로 생성된 빈 객체, 즉 인스턴스는 this에 바인딩된다.
- 따라서 슈퍼클래스의 constructor 내부의 this는 생성된 인스턴스를 가리킨다.
- new연산자와 함께 호출된 클래스가 서브 클래스라는 것이 중요하다.
- 즉, new연산자와 함께 호출된 함수를 가리키는 new.target은 서브클래스를 가리킨다.
- 따라서 인스턴스는 new.target이 가리크는 서브클래스가 생성한 것으로 처리된다.

> 3.슈퍼클래스의 인스턴스 초기화

- 슈퍼클래스의 constructor가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다.
- 전달받은 초기값으로 인스턴스릐 프로퍼티를 초기화한다.

> 4.서브클래스constructor로의 복귀와 this 바인딩

- super의 호출이 종료되고 제어 흐림이 서브클래스 constructor로 돌아온다.
- 이때 super가 반환한 인스턴스가 this에 바인딩된다. 서브클래스는 별도의 인스턴스를 생성하지 않고 super가 반환한 인스턴스를 this에 바인딩하여 그대로 사용한다.
- 이처럼 super가 호출되지 않으면 인스턴스가 생성되지 않으며, this 바인딩도 할 수 없다.
- 서브클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없는 이유가 바로 이 때문이다.
- 따라서 서브클래스 constructor내부의 인스턴스 초기화는 반드시 super호출 이후에 처리되어야 한다.

> 5.서브클래스의 인스터스 초기화

- super 호출 이후, 서브클래스의 constructor에 기술되어 있는 인스턴스 초기화가 실행된다
- 즉, this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화한다.

> 6.인스턴스 반환

- 클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

### 25-74

```javascript
// 수퍼클래스
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  toString() {
    return `width = ${this.width}, height = ${this.height}`;
  }
}

// 서브클래스
class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);
    this.color = color;
  }

  // 메서드 오버라이딩
  toString() {
    return super.toString() + `, color = ${this.color}`;
  }
}

const colorRectangle = new ColorRectangle(2, 4, "red");
console.log(colorRectangle); // ColorRectangle {width: 2, height: 4, color: "red"}

// 상속을 통해 getArea 메서드를 호출
console.log(colorRectangle.getArea()); // 8
// 오버라이딩된 toString 메서드를 호출
console.log(colorRectangle.toString()); // width = 2, height = 4, color = red
```

<!-- Line -->

---

### 25.8.7 표준 빌트인 생성자 함수 확장

- extends 키워드 다음에는 클래스뿐만 아니라 [[Construct]]내부 메서드를 갖는 함수 객체로 평가될 수 있는 모든 표현식을 사용할 수 있다.
- Array 생성자 함수를 상속받아 확장한 MyArray 클래스가 생성한 인스턴스는 Array.prototype과 MyArray.prototype의 모든 메서드를 사용할 수 있다.
- 주의할 것은 Array.prototype의 메서드중 map, filter와 같은 새로운 배열을 반환하는 메서드가 MyArray 클래스의 인스턴스를 반환하지 않고 Array의 인스턴스를 반환하면 MyArray 클래스의 메서드와 메서드 체이닝이 불가능하다.

### 25-80

```javascript
// Array 생성자 함수를 상속받아 확장한 MyArray
class MyArray extends Array {
  // 중복된 배열 요소를 제거하고 반환한다: [1, 1, 2, 3] => [1, 2, 3]
  uniq() {
    return this.filter((v, i, self) => self.indexOf(v) === i);
  }

  // 모든 배열 요소의 평균을 구한다: [1, 2, 3] => 2
  average() {
    return this.reduce((pre, cur) => pre + cur, 0) / this.length;
  }
}

const myArray = new MyArray(1, 1, 2, 3);
console.log(myArray); // MyArray(4) [1, 1, 2, 3]

// MyArray.prototype.uniq 호출
console.log(myArray.uniq()); // MyArray(3) [1, 2, 3]
// MyArray.prototype.average 호출
console.log(myArray.average()); // 1.75
```

### 25-83

```javascript
// Array 생성자 함수를 상속받아 확장한 MyArray
class MyArray extends Array {
  // 모든 메서드가 Array 타입의 인스턴스를 반환하도록 한다.
  static get [Symbol.species]() {
    return Array;
  }

  // 중복된 배열 요소를 제거하고 반환한다: [1, 1, 2, 3] => [1, 2, 3]
  uniq() {
    return this.filter((v, i, self) => self.indexOf(v) === i);
  }

  // 모든 배열 요소의 평균을 구한다: [1, 2, 3] => 2
  average() {
    return this.reduce((pre, cur) => pre + cur, 0) / this.length;
  }
}

const myArray = new MyArray(1, 1, 2, 3);

console.log(myArray.uniq() instanceof MyArray); // false
console.log(myArray.uniq() instanceof Array); // true

// 메서드 체이닝
// uniq 메서드는 Array 인스턴스를 반환하므로 average 메서드를 호출할 수 없다.
console.log(myArray.uniq().average());
// TypeError: myArray.uniq(...).average is not a function
```
