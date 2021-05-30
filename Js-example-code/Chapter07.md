# Chapter 7

```javascript
//예제07-06
var x = "1";

// 문자열을 숫자로 타입 변환함
console.log(+x); // 1
//부수효과 없음
console.log(x); //"1"

// 불리언 값을 숫자로 타입 변환함
x = true;
console.log(+x); //1
//부수효과 없음
console.log(x); //true

// 불리언 값을 숫자로 타입 변환함
x = false;
console.log(+x); //0
//부수효과 없음
console.log(x); //false

// 문자열을 숫자로 타입 변환 불가능
x = "hello";
console.log(+x); //NaN
//부수효과 없음
console.log(x); //'hello'

//예제 07-07
//부호를 반전한 값을 생성해 반환한다.
-(-10); //10

//문자열을 숫자로 타입변환
-"10"; //-10

//불리언 값을 숫자로 타입 변환
-true; //-1

//문자열은 숫자로 타입 변환 불가능
-"Hello"; // NaN

// 예제07-08
//문자열 연결 연산자
"1" + 2; // '12'
1 + "2"; // '12

//산술연산자
1 + 2; // 3

//true는 1로 타입 변환
1 + true; //2

//false는 0로 타입 변환
1 + false; //1

//null는 0로 타입 변환
1 + null; //1

//undefined는 숫로로 타입 변환 불가능
1 + undefined; // NaN

// 예제07-15
// NaN은 자신과 일치하지 않는 유일한 값이다.
NaN === NaN; // false

// 에제07-17
//양의 0과 음의0의 비교, 일치비교/동등비교 모두 같은결과
0 === -0; // true
0 == -0; // true

//예제07-18
//ES6에서 도입된 Object.is메서드는 다음과 같은 예측이 가능한 정확한 비교 결과를 반환한다.
-0 === +0; //true
Object.is(-0, +0); //false

NaN === NaN; // false
Object.is(NaN, NaN); //true

// 예제07-34
2 ** 2; // 4
2 ** 2.5; // 5.65685424
2 ** 0; //1
2 ** -2; //0.25

Math.pow(2, 2); //4
Math.pow(2, 2.5); //  5.65685424
Math.pow(2, 0); //1
Math.pow(2, -2); //0.25
```
