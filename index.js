
// 예제09-06
// 숫자 타입
0 + ''                  //"0"
- 0 + ''                //"0"
1 + ''                  //"1"  
- 1 + ''                //"-1"
NaN + ''                //"NaN "
Infinity + ''           //"Infinity"
- Infinity + ''         //"- Infinity "

// 불리언 타입
true + ''               //"true"         
false + ''              //"false"

// null 타입
null + ''               //"null"

// undefined 타입
undefined + ''          //"undefined"

// 심벌타입
(Symbol()) + ''         //"TypeError : Cannot convert a Symbol value to a string"

// 객체 타입
({}) + ''               //"[object Object"
Math + ''               //"object Math"
[ ] + ''                 //""
[10, 20] + ''           //"10, 20"
(function () { }) + ''  //"function () { }"
Array + ''              //"function Array() {[native code]}"

// 예제09-09
// 문자열 타입
+''                  //0
+'0'                //0
+'1'                  //1  
+'string'                //NaN

// 불리언 타입
+true                //1         
+false               //0

// null 타입
+null                //0

// undefined 타입
+undefined           //NaN

// 심벌타입
+(Symbol())         //"TypeError : Cannot convert a Symbol value to a string"

// 객체 타입
+{}               //NaN
+[]                 //0
+[10, 20]            //NaN
+ (function () { })   //NaN

//예제09-13
// 전달받은 인수가 Falsy 값이면 true, Truthy값이면 false를 반환한다.
function isFalsy(v) {
    return !v;
}

// 전달받은 인수가 Truthy 값이면 true, Falsy값이면 false를 반환한다.
function isFalsy(v) {
    return !!v;
}

// 모두 true를 반환한다.
isFalsy(false);
isFalsy(undefined);
isFalsy(null);
isFalsy(0);
isFalsy(NaN);
isFalsy(' ');

// 모두 true를 반환한다.
isTruthy(true);
isTruthy('0'); //빈 문자열이 아닌 문자열은 Truthy 값이다.
isTruthy({});
isTruthy([]);

//예제09-14
// 1.String 생성자 함수를 new연산자 없이 호출하는 방법
// 숫자 타입 => 문자열 타입
String(1);          // "1"
String(NaN);        //"NaN"
String(Infinity);   //"Infinity"

// 불리언 타입 => 문자열 타입
String(true);       //"true"
String(false);      //"false"

// 2.Object.prototype.toString 메서드를 사용하는 방법
// 숫자 타입 => 문자열 타입
(1).toString();         // "1"
(NaN).toString();       //"NaN"
(Infinity).toString();  //Infinity
// 불리언 타입 => 문자열 타입
(true).toString();      //"true"
(false).toString();     //"false"

// 3.문자열 연결 연산자를 이용하는 방법
// 숫자 타입 => 문자열 타입
1 + '';             // "1"
NaN + '';           // "NaN"
Infinity + '';      // "Infinity"
// 불리언 타입 => 문자열 타입
true + '';          // "true"
false + '';         // "false"

//예제09-15
// 1.Number 생성자 함수를 new연산자 없이 호출하는 방법
// 문자열 타입 => 숫자 타입
Number(1);          // 0
Number(NaN);        // -1
Number(Infinity);   //10.53

// 불리언 타입 => 문자열 타입
Number(true);       //1
Number(false);      //0

// 2. parseInt, parseFloat 힘슬,ㄹ 시용하는 방법(문자열만 변환 가능)
// 문자열 타입 => 숫자 타입
parseInt('0');         // "1"
parseInt('-1');       //"NaN"
parseInt('10.53');  //Infinity

//3. +단항 산술 연산자를 이용하는 방법
// 문자열타입 => 숫자 타입
+'0';           // 0
+'-1';          // -1
+'10.53';       // 10.53

// 불리언 타입 => 숫자 타입
+true                //1         
+false               //0

//4. *산술 연산자를 이용하는 방법
'0' * 1;            //0
'-1' + 1;           //-1
'10.53' * 1;        //10.53
// 불리언 타입 => 숫자 타입
true * 1;             //1
false * 1;            //0

// 예제 09-16
// 1. Boolean 생성자 함수를 new연산자 없이 호출하는 방법
//  문자열 타입 => 불리언 타입
Boolean('x');       // true
Boolean('');        // false
Boolean('false');   // true
//  숫자 타입 => 불리언 타입
Boolean(0);         // false
Boolean(1);         // true
Boolean(NaN);       // false
Boolean(Infinity);  // true
//  null 타입 => 불리언 타입
Boolean(null);      // false
//  undefined 타입 => 불리언 타입
Boolean(undefined); // false
//  객체 타입 => 불리언 타입
Boolean({});        // true
Boolean([]);        // true

// 2. ! 부정 논리 연산자를 두번 사용하는 방법
// 문자열 타입 => 불리언 타입
!!'x';              // true
!!'';               // false
!!'false';          // true
// 숫자 타입 => 불리언 타입
!!0;                // false
!!1;                // true
!!NaN;              // false
!!Infinity;         // true
// null 타입 => 불리언 타입
!!null;             // false
// undefined 타입 => 불리언 타입
!!undefined;        // false
// 객체 타입 => 불리언 타입
!!{};               // true
!![];               // true

// 예제 09-19
// 논리합(||) 연산자
'Cat' || 'Dog'  //"Cat"
false || 'Dog'  //"Dog"
'Cat' || false  //"Cat"
// 논리곱(&&) 연산자
'Cat' && 'Dog'  // "Dog"
false && 'Dog'  // false
'Cat' && false  // false

// 예제 09-20
var done = true;
var message = '';

// 주어진 조건이 true일때
if (done) message = '완료'

// if문은 단축 평가로 대체 가능하다.
//done이 true라면 message에 '완료'를 할당
message = done && '완료';
console.log(message);


// 예제 09-23
//객체를 가리키기를 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때 
var elem = null;
var value = elem.value; // TypeError : Cannot read property 'value' to a null 
//발생하는 참조 에러를 단축평가를 사용하면 에러를 발생시키지 않는다.
// 예제 09-24
var elem = null;
// elem이 null이나 undefined와 같은 Falsy 값이면 elem으로 평가되고
//elem이 Truthy 값이면 elem.value로 평가된다.
var value = elem && elem.value; // null


// 예제 09-25
//함수 매개변수에 기본값을 설정할 떄
// 단축 평가를 사용한 매개변수의 기본값 설정
function getStringLength(str) {
    str = str || '';
    return str.length;
}

getStringLength();      //0
getStringLength('hi');  //2

//ES6의 매개변수의 기본값 설정
function getStringLength(str = '') {
    return str.length;
}

getStringLength();      //0
getStringLength('hi');  //2

// 예제 09-26
var elem = null;

//elem이 null 또는 undefuned이면 undefined를 반환하고 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
var value = elem?.value;
console.log(value); //undefined

// 예제 09-27
var elem = null;

//elem이 null 또는 undefuned이면 undefined를 반환하고 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
var value = elem && elem.value;
console.log(value); //null

// 예제 09-28
var str = '';

// 문자열의 길이(length)를 참조한다.
var length = str && str.length;
// 문자열의 길이(length)를 참조하지 못한다.
console.log(length); // ''

// 예제 09-29
var str = '';

// 문자열의 길이(length)를 참조한다. 이때 좌항 피연산자가 false로 평가되는 Falsy값이라도
//null 또는 undefined가 아니면 우항의 프로퍼티 참조를 이어간다.
var length = str?.length;
// 문자열의 길이(length)를 참조하지 못한다.
console.log(length); // 0

// 예제 09-30
//좌항의 피연산자가 null또는 undefined이면 우항의 피연산자를 반환하고,
//그렇지 않으면 좌항의 피연산자를 반환한다.
var foo = null ?? 'default string';
console.log(foo); // "default string"

// 예제 09-31
var foo = '' || 'default string';
console.log(foo); // "default string"

// 예제 09-32
var foo = '' ?? 'default string';
console.log(foo); // ""
