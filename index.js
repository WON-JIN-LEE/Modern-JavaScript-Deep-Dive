


// 15-05
var foo = 123;
// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다. 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는
// 것처럼 동작한다.
var foo = 456;

let bar = 123;
// let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
let bar = 456; // SyntaxError: Identifier 'bar' has already been declared
// 15-06
let foo = 1; // 전역 변수

{
    let foo = 2; // 지역 변수
    let bar = 3; // 지역 변수
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined
// 15-07
console.log(foo); // ReferenceError: foo is not defined
let foo;
// 15-08 var 키워드로 선언한 변수는 런타임 이전에 선언 단계와 초기화 단계가 실행된다. 따라서 변수 선언문 이전에 변수를 참조할 수
// 있다.
console.log(foo); // undefined

var foo;
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1
// 15-09 런타임 이전에 선언 단계가 실행된다. 아직 변수가 초기화되지 않았다. 초기화 이전의 일시적 사각 지대에서는 변수를 참조할 수
// 없다.
console.log(foo); // ReferenceError: foo is not defined

let foo; // 변수 선언문에서 초기화 단계가 실행된다.
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1

// 15-11 이 예제는 브라우저 환경에서 실행해야 한다. 전역 변수
var x = 1;
// 암묵적 전역
y = 2;
// 전역 함수
function foo() {}

// var 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티다.
console.log(window.x); // 1
// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(x); // 1

// 암묵적 전역은 전역 객체 window의 프로퍼티다.
console.log(window.y); // 2
console.log(y); // 2

// 함수 선언문으로 정의한 전역 함수는 전역 객체 window의 프로퍼티다.
console.log(window.foo); // ƒ foo() {}
// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(foo); // ƒ foo() {}
// 15-12 이 예제는 브라우저 환경에서 실행해야 한다.
let x = 1;

// let, const 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티가 아니다.
console.log(window.x); // undefined
console.log(x); // 1
// 15-15
{
    // 변수 호이스팅이 발생하지 않는 것처럼 동작한다
    console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
    const foo = 1;
    console.log(foo); // 1
}

// 블록 레벨 스코프를 갖는다.
console.log(foo); // ReferenceError: foo is not defined
// 15-16
const foo = 1;
foo = 2; // TypeError: Assignment to constant variable.

// 15-18 세율을 의미하는 0.1은 변경할 수 없는 상수로서 사용될 값이다. 변수 이름을 대문자로 선언해 상수임을 명확히 나타낸다.
const TAX_RATE = 0.1;

// 세전 가격
let preTaxPrice = 100;

// 세후 가격
let afterTaxPrice = preTaxPrice + (preTaxPrice * TAX_RATE);

console.log(afterTaxPrice); // 110
// 15-19
const person = {
    name: 'Lee'
};

// 객체는 변경 가능한 값이다. 따라서 재할당없이 변경이 가능하다.
person.name = 'Kim';

console.log(person); // {name: "Kim"}