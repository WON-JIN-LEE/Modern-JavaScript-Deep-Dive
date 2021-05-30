# 6장

```javascript
//예제 06-01
var integer = 10;
var double = 10.12;
var nagative = -20;

var binary = 0b01000001;
var octal = 0o101;
var hex = 0x41;

console.log(binary);
console.log(octal);
console.log(hex);
console.log(binary === octal);
console.log(octal === hex);

// 예제 06-04
// 숫자 타입의 세가지 특별한 값
console.log(10 / 0); //Infinity
console.log(10 / -0); //-Infinity
console.log(1 * "String"); //NaN : 산술연산 불가

//6-6 문자열타입
var string;
string = "문자열";
string = "문자열";
string = `문자열`;

string = '작은따옴표로 감싼 문자열 내의 "큰따움표는" 문자열로 인신된다.';
string = "큰따옴표로 감싼 문자열 내의 '작은따움표는' 문자열로 인신된다.";

//예제 6-28 타입조사
var foo;
console.log(typeof foo);

foo = 3;
console.log(typeof foo);

foo = "hello";
console.log(typeof foo);

foo = true;
console.log(typeof foo);

foo = null;
console.log(typeof foo);

foo = Symbol();
console.log(typeof foo);

foo = {};
console.log(typeof foo);

foo = [];
console.log(typeof foo);

foo = function () {};
console.log(typeof foo);
```
