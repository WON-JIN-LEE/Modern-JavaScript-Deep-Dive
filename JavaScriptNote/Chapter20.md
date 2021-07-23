# 20장 strict mode

## 20.1 strict mode란?

- foo함수 내에서 선언하지 않은 x변수에 값을 10을 할당했다. JS엔진은 x변수가 어디에서 선언되었지 스코프 체인을 통해 검색하기 시작한다.
- 전역스코프에서 x변수의 선언이 존재하지 않기 때문에 ReferenceError를 발생시킬 것 같지만 JS엔진은 암묵적으로 전역 객체에 x프로퍼티를 동적 생성한다. 이러한 현상을 암묵적 전역이라 한다.
- 개발자의 의도와는 상관없이 발생하는 암묵적 전역은 오류를 발생시키는 원인이 될 가능성이 크다.
- 오타나 문법 지식의 미비로 인한 실수를 방지하기 위해 ES5부터 strict mode가 추가되었다.
- strict mode는 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 JS엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대한 명시적인 에러를 발생시킨다.
- ESLint같은 린트 도구를 사용해도 strict mode와 유사한 효과를 얻을 수 있다.
- 린트 도구는 정적 분석 기능을 통해 소스 코드 실행하기 전에 소스코드를 스캔하여 문법적 오류와 잠재적 오류까지 찾아내고 오류의 원인을 리포팅해주는 도구다.

### 예제 20 - 01

```javascript
function foo() {
  x = 10;
}
foo();

console.log(x); // ?
```

<!-- Line -->

---

## 20.2 strict mode의 적용

- strict mode를 적용하려면 전역의 선두 또는 함수 몸체의 선두에 'strict mode'; 를 추가한다.
- 전역의 선두에 추가하면 스크립트 전체에 strict mode가 적용된다.
- 코드의 선두에 'strict mode';를 위치시키지 않으면 strict mode가 제대로 동작하지 않는다.

### 예제 20 - 02

```javascript
"use strict";

function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();
```

### 예제 20 - 03

```javascript
function foo() {
  "use strict";

  x = 10; // ReferenceError: x is not defined
}
foo();
```

### 예제 20 - 04

```javascript
function foo() {
  x = 10; // 에러를 발생시키지 않는다.
  ("use strict");
}
foo();
```

<!-- Line -->

---

## 20.3 전역에 strict mode를 적용하는 것은 피하자

- 전역에 적용한 strict mode는 스크립트 단위로 적용된다.
- 하지만 strict mode 스크립트와 non-strict mode 스크립트를 혼용하는 것은 오류를 발생시킬 수 있다. 특히 외부 라리브러리를 사용하는 경우 라이브러리가 non-strict mode인 경우도 있기 때문이다.
- 이러한 경우 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용한다.

### 예제 20 - 05

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      "use strict";
    </script>
    <script>
      x = 1; // 에러가 발생하지 않는다.
      console.log(x); // 1
    </script>
    <script>
      "use strict";

      y = 1; // ReferenceError: y is not defined
      console.log(y);
    </script>
  </body>
</html>
```

### 예제 20 - 06

```javascript
// 즉시 실행 함수의 선두에 strict mode 적용
(function () {
  "use strict";

  // Do something...
})();
```

<!-- Line -->

---

## 20.4 한수 단위로 strict mode를 적용하는 것도 피하자

- strict mode가 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 이 또한 문제가 발생할 수 있다.
- 따라서 strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

### 예제 20 - 07 (function () {

```javascript
    // non-strict mode
    var lеt = 10; // 에러가 발생하지 않는다.

    function foo() {
        'use strict';

        let = 20; // SyntaxError: Unexpected strict mode reserved word
    }
    foo();

}());
```

<!-- Line -->

---

## 20.5 strict mode가 발생시키는 에러

### 20.5.1 암묵적 전역

- 선언하지 않은 변수를 참조하면 ReferenceError가 발생한다.

### 예제 20 - 08 (function () {

```javascript
    'use strict';

    x = 1;
    console.log(x); // ReferenceError: x is not defined

}());
```

### 20.5.2 변수, 함수, 매개변수의 삭제

- delete 연산자로 변수, 함수 , 매개변수를 삭제하면 SyntaxError가 발생한다.

### 예제 20 - 09

```javascript
(function () {
'use strict';

    var x = 1;
    delete x;
    // SyntaxError: Delete of an unqualified identifier in strict mode.

    function foo(a) {
        delete a;
        // SyntaxError: Delete of an unqualified identifier in strict mode.
    }
    delete foo;
    // SyntaxError: Delete of an unqualified identifier in strict mode.

}());
```

### 20.5.3 매개변수 이름의 중복

- 중복된 매개변수 이름을 사용하면 SyntaxError가 발생한다.

### 예제 20 - 10

```javascript
(function () {
  "use strict";

  //SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
})();
```

### 20.5.4 with 문의 사용

- with문을 사용하면 SyntaxError가 발생한다.
- with문은 전달된 객체를 스코프 체인에 추가한다.
- with문은 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서 코드가 간단해지는 효과가 있지만 가독성이 나빠진다. 따라서 with문은 사용하지 않는 것이 좋다.

### 예제 20 - 11

```javascript
(function () {
  "use strict";

  // SyntaxError: Strict mode code may not include a with statement
  with ({ x: 1 }) {
    console.log(x);
  }
})();
```

<!-- Line -->

---

## 20.6 strict mode 적용에 의한 변화

### 20.6.1 일반 함수의 this

- strict mode에서 함수를 일반 함수로 호출하면 this에 undefined가 바인딩된다.
- 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다.

### 예제 20 - 12

```javascript
(function () {
  "use strict";

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
})();
```

### 20.6.2 arguments 객체

- strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.

### 예제 20 - 13

```javascript
(function (a) {
  "use strict";
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
})(1);
```
