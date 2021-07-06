# 28장 Number

- 표준 필트인 객체인 Number는 원시 타입인 숫자를 다룰 떄 유용한 프로퍼티와 메서드를 제공한다.

## 28.1 Number 생성자 함수

- 표준 빌트인 객체인 Number 객체는 생성자 함수 객체다. 따라서 new연산자와 함께 호출하여 Number인스턴스를 생성할 수 있다.
- Number생성자 함수에 인수를 전달하지 않고 호출하면 [[NumberData]] 내부 슬롯에 0을 할당한 Number 래퍼 객체를 생성한다. 인수를 전달받으면 전달받은 숫자를 할당했다.
- ES5에서는 [[NumberData]]를 [[PrimitiveValue]]라 불렀다.
- Number생성자 함수의 인수로 숫자가 아닌 값으 전달하면 인수를 숫자로 강제 변환 후, [[NumberData]]에 변환된 숫자를 할당한 Number 래퍼 객체를 생성한다. 인수를 숫자로 변환할 수 없다면 NaN으로 할당한다.
- new연산자를 사용하지 않고 Number생성자 함수를 호

### 예제 28-01

```js
const numObj = new Number();
console.log(numObj); // Number {[[PrimitiveValue]]: 0}
```

### 예제 28-02

```js
const numObj = new Number(10);
console.log(numObj); // Number {[[PrimitiveValue]]: 10}
```

### 예제 28-03

```js
let numObj = new Number("10");
console.log(numObj); // Number {[[PrimitiveValue]]: 10}

numObj = new Number("Hello");
console.log(numObj); // Number {[[PrimitiveValue]]: NaN}
```

### 예제 28-04

```js
// 문자열 타입 => 숫자 타입
Number("0"); // -> 0
Number("-1"); // -> -1
Number("10.53"); // -> 10.53

// 불리언 타입 => 숫자 타입
Number(true); // -> 1
Number(false); // -> 0
```

<!-- Line -->

---

## 28.2 Number 프로퍼티

### 28.2.1 Number.EPSILON

- Number.EPSILON은 JavaScript에서 표현할 수 있는 가장 작은 수이다. 이는 임의의 수와 그 수보다 큰 수 중 가장 작은 수와의 차이와 같다.
- Number.EPSILON은 약 2.2204460492503130808472633361816E-16 또는 2-52이다.
- 부동소수점 산술 연산 비교는 정확한 값을 기대하기 어렵다.
- 부동소수점을 표현하는 가장 널리 쓰이는 표준인 IEEE 754은 2진법으로 변환시 무한소수가 되어 미세한 오차가 발생할 수밖에 없는 구조적 한계를 갖는다.
- Number.EPSILON은 부동소수점으로 인해 발생하는 오차를 해결하기 위해 사용한다.

### 예제 28-05

```js
0.1 + 0.2; // -> 0.30000000000000004
0.1 + 0.2 === 0.3; // -> false
```

### 예제 28-06

```js
function isEqual(a, b) {
  // a와 b를 뺀 값의 절대값이 Number.EPSILON보다 작으면 같은 수로 인정한다.
  return Math.abs(a - b) < Number.EPSILON;
}

isEqual(0.1 + 0.2, 0.3); // -> true
```

<!-- Line -->

---

### 28.2.2 Number.MAX_VALUE

- 자바스크립트에서 사용 가능한 가장 큰 양수 값(1.7976931348623157e+308)를 반환한다. MAX_VALUE보다 큰 숫자는 Infinity이다.

### 예제 28-07

```js
Number.MAX_VALUE; // -> 1.7976931348623157e+308
Infinity > Number.MAX_VALUE; // -> true
```

### 8.2.3 Number.MIN_VALUE

- 자바스크립트에서 사용 가능한 가장 작은 양수 값(5e-324)를 반환한다. MIN_VALUE는 0에 가장 가까운 양수 값이다. MIN_VALUE보다 작은 숫자는 0으로 변환된다.

### 예제 28-08

```js
Number.MIN_VALUE; // -> 5e-324
Number.MIN_VALUE > 0; // -> true
```

<!-- Line -->

---

### 28.2.4 Number.MAX_SAFE_INTEGER

- Number.MAX_SAFE_INTEGER는 자바스크립트에서 안전하게 표현할 수 있는 가장 큰 정수 값(9007199254740991)이다.

### 예제 28-09

```js
Number.MAX_SAFE_INTEGER; // -> 9007199254740991
```

### 28.2.5 Number.MIN_SAFE_INTEGER

- Number.MIN_SAFE_INTEGER는 자바스크립트에서 안전하게 표현할 수 있는 가장 작은 정수 값(-9007199254740991)이다.

### 예제 28-10

```js
Number.MIN_SAFE_INTEGER; // -> -9007199254740991
```

<!-- Line -->

---

### 28.2.6 Number.POSITIVE_INFINITY

- Number.POSITIVE_INFINITY는 양의 무한대를 나타내는 숫자값 Infinity와 같다.

### 예제 28-11

```js
Number.POSITIVE_INFINITY; // -> Infinity
```

### 28.2.7 Number.NEGATIVE_INFINITY

- Number.NEGATIVE_INFINITY는 음의 무한대를 나타내는 숫자값 -Infinity와 같다.

### 예제 28-12

```js
Number.NEGATIVE_INFINITY; // -> -Infinity
```

### 28.2.8 Number.NaN

- 숫자가 아님(Not-a-Number)을 나타내는 숫자값이다. Number.NaN 프로퍼티는 window.NaN 프로퍼티와 같다.

### 예제28-13

```js
Number.NaN; // -> NaN
```

<!-- Line -->

---

## 28.3 Number 메서드

### 28.3.1 Number.isFinite

- ES6에서 도입된 Number.isFinite 정적 메서드는 인수로 전달된 숫자 값이 정상적인 유한수인지 아닌지 검사하여 그결과를 불리언 값으로 반환한다.
- 만약 인수가 NaN이면 언제나 false를 반환한다.
- Number.isFinite()는 전역 함수 isFinite()와 차이가 있다. 전역 함수 isFinite()는 인수를 숫자로 변환하여 검사를 수행하지만 Number.isFinite()는 인수를 변환하지 않는다. 따라서 숫자가 아닌 인수가 주어졌을 때 반환값은 언제나 false가 된다.

### 예제 28-14

```js
// 인수가 정상적인 유한수이면 true를 반환한다.
Number.isFinite(0); // -> true
Number.isFinite(Number.MAX_VALUE); // -> true
Number.isFinite(Number.MIN_VALUE); // -> true

// 인수가 무한수이면 false를 반환한다.
Number.isFinite(Infinity); // -> false
Number.isFinite(-Infinity); // -> false

Number.isFinite(NaN); // -> false
```

### 예제 28-16

```js
// Number.isFinite는 인수를 숫자로 암묵적 타입 변환하지 않는다.
Number.isFinite(null); // -> false

// isFinite는 인수를 숫자로 암묵적 타입 변환한다. null은 0으로 암묵적 타입 변환된다.
isFinite(null); // -> true
```

<!-- Line -->

---

### 28.3.2 Number.isInteger

- 매개변수에 전달된 값이 정수(Integer)인지 검사하여 그 결과를 Boolean으로 반환한다. 검사전에 인수를 숫자로 변환하지 않는다.

### 예제 28-17

```js
// 인수가 정수이면 true를 반환한다.
Number.isInteger(0); // -> true
Number.isInteger(123); // -> true
Number.isInteger(-123); // -> true

// 0.5는 정수가 아니다.
Number.isInteger(0.5); // -> false
// '123'을 숫자로 암묵적 타입 변환하지 않는다.
Number.isInteger("123"); // -> false
// false를 숫자로 암묵적 타입 변환하지 않는다.
Number.isInteger(false); // -> false
// Infinity/-Infinity는 정수가 아니다.
Number.isInteger(Infinity); // -> false
Number.isInteger(-Infinity); // -> false
```

<!-- Line -->

---

### 28.3.3 Number.isNaN

- 매개변수에 전달된 값이 NaN인지를 검사하여 그 결과를 Boolean으로 반환한다.
- Number.isNaN()는 전역 함수 isNaN()와 차이가 있다. 전역 함수 isNaN()는 인수를 숫자로 변환하여 검사를 수행하지만 Number.isNaN()는 인수를 변환하지 않는다.
- 따라서 숫자가 아닌 인수가 주어졌을 때 반환값은 언제나 false가 된다.

### 예제 28-18

```js
// 인수가 NaN이면 true를 반환한다.
Number.isNaN(NaN); // -> true
```

### 예제 28-19

```js
// Number.isNaN은 인수를 숫자로 암묵적 타입 변환하지 않는다.
Number.isNaN(undefined); // -> false

// isFinite는 인수를 숫자로 암묵적 타입 변환한다. undefined는 NaN으로 암묵적 타입 변환된다.
isNaN(undefined); // -> true
```

<!-- Line -->

---

### 28.3.4 Number.isSafeInteger

- 매개변수에 전달된 값이 안전한(safe) 정수값인지 검사하여 그 결과를 Boolean으로 반환한다.
- 안전한 정수값은 -(253 - 1)와 253 - 1 사이의 정수값이다. 검사전에 인수를 숫자로 변환하지 않는다.

### 예제 28-20

```js
// 0은 안전한 정수이다.
Number.isSafeInteger(0); // -> true
// 1000000000000000은 안전한 정수이다.
Number.isSafeInteger(1000000000000000); // -> true

// 10000000000000001은 안전하지 않다.
Number.isSafeInteger(10000000000000001); // -> false
// 0.5은 정수가 아니다.
Number.isSafeInteger(0.5); // -> false
// '123'을 숫자로 암묵적 타입 변환하지 않는다.
Number.isSafeInteger("123"); // -> false
// false를 숫자로 암묵적 타입 변환하지 않는다.
Number.isSafeInteger(false); // -> false
// Infinity/-Infinity는 정수가 아니다.
Number.isSafeInteger(Infinity); // -> false
```

<!-- Line -->

---

### 28.3.5 Number.prototype.toExponential

- 대상을 지수 표기법으로 변환하여 문자열로 반환한다. 지수 표기법이란 매우 큰 숫자를 표기할 때 주로 사용하며 e(Exponent) 앞에 있는 숫자에 10의 n승이 곱하는 형식으로 수를 나타내는 방식이다.
- 인수로 소수점 이하로 표현할 자릿수를 전달할 수 있다.
- 자바스크립트 엔진은 숫자 뒤의 .을 부동 소수점 숫자의 소수구분 기호로 해석한다.
- 따라서 숫자 리터럴과 함께 메서드를 사용할 경우 혼란을 방지하기 위해 그룹 연산자()를 사용할것을 권장한다.
- 다른 방법은 정수 부분과 메서드 사이에 공백 주게되면 .을 프로퍼티 접근 연산자로 해석한다.

### 예제 28-21

```js
(77.1234).toExponential(); // -> "7.71234e+1"
(77.1234).toExponential(4); // -> "7.7123e+1"
(77.1234).toExponential(2); // -> "7.71e+1"
```

### 예제 28-22

```js
77.toExponential(); // -> SyntaxError: Invalid or unexpected token
77.1234.toExponential(); // -> "7.71234e+1"
(77).toExponential(); // -> "7.7e+1"
77 .toExponential(); // -> "7.7e+1"
```

<!-- Line -->

---

### 28.3.6 Number.prototype.toFixed

- toFixed 메서드는 매개변수로 지정된 소숫점자리를 반올림하여 문자열로 반환한다.
- 반올림하는 소수점 이하 자릿수를 나타내는 0~20 사이의 정수값을 인수로 전달할 수 있다. 인수를 생략하면 기본값은 0이 지정된다.

### 예제 28-26

```js
// 소수점 이하 반올림. 인수를 생략하면 기본값 0이 지정된다.
(12345.6789).toFixed(); // -> "12346"
// 소수점 이하 1자리수 유효, 나머지 반올림
(12345.6789).toFixed(1); // -> "12345.7"
// 소수점 이하 2자리수 유효, 나머지 반올림
(12345.6789).toFixed(2); // -> "12345.68"
// 소수점 이하 3자리수 유효, 나머지 반올림
(12345.6789).toFixed(3); // -> "12345.679"
```

<!-- Line -->

---

### 28.3.7 Number.prototype.toPrecision

- 매개변수로 지정된 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환한다. 지정된 전체 자릿수로 표현할 수 없는 경우 지수 표기법으로 결과를 반환한다.
- 전체 자릿수를 나타내는 0 ~ 21 사이의 정수값을 인수로 전달할 수 있다. 인수를 생략하면 0이 지정된다.

### 예제 28-27

```js
// 전체 자리수 유효. 인수를 전달하지 않으면 기본값 0이 전달된다.
(12345.6789).toPrecision(); // -> "12345.6789"
// 전체 1자리수 유효, 나머지 반올림
(12345.6789).toPrecision(1); // -> "1e+4"
// 전체 2자리수 유효, 나머지 반올림
(12345.6789).toPrecision(2); // -> "1.2e+4"
// 전체 6자리수 유효, 나머지 반올림
(12345.6789).toPrecision(6); // -> "12345.7"
```

<!-- Line -->

---

### 28.3.8 Number.prototype.toString

- toString메서드는 숫자를 문자열로 변환하여 반환한다.
- 진법을 나타내는 2~36 사이의 정수값을 인수로 전달하면 전달된 진법으로 변환한다.
- 인수를 생햑하면 기본값 10진법이 지정된다.

### 예제 28-28

```js
// 인수를 생략하면 10진수 문자열을 반환한다.
(10).toString(); // -> "10"
// 2진수 문자열을 반환한다.
(16).toString(2); // -> "10000"
// 8진수 문자열을 반환한다.
(16).toString(8); // -> "20"
// 16진수 문자열을 반환한다.
(16).toString(16); // -> "10"
```
