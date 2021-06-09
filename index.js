

//예제 12-05
//함수 선언문
function add(x, y) {
    return x + y;
}
//함수 참조
console.log(add);// f add(x,y)

//함수 호출
console.log(add(2, 5));


//예제 12-06
//함수 선언문은 함수 이름을 생략할 수 없다.
function add(x, y) {
    return x + y;
}
// SymtaxEror : Function statements require a function name

//예제 12-09
var add = function add(x, y) {
    return x + y;
};

console.log(add(2, 5)); // 7


//예제 12-10
var add = function (x, y) {
    return x + y;
};

console.log(add(2, 5)); // 7



//예제 12-11
var add = function foo(x, y) {
    return x + y;
};

//함수 객체를 가리키는 식별자로 호출
console.log(add(2, 5)); // 7

//함수 이름으로 호출하면
console.log(foo(2, 5)); // ReferenceError

//예제 12-12
//함수 참조
console.dir(add);
console.dir(sub);

//함수 호출
console.log(add(2, 5));
console.log(sub(2, 5));

//함수 선언문
function add(x, y) {
    return x + y;
}

//함수 표현식
var sub = function (x, y) {
    return x - y;
};

//예제 12-13
var add = new Function('x', 'y', 'return x + y');
console.log(add(2, 5)); // 7

//예제 12-15
const add = (x, y) => x + y;
console.log(add(2, 5)); // 7



//예제 12-17
function add(x, y) {
    console.log(x, y);
    return x + y;
}

add(2, 5);

// add함수의 매개변수 x,y는 함수 몸체 내부에서만 참조할 수 있다.
console.log(x, y); //ReferenceError : x is not defined

//예제 12-18
function add(x, y) {
    return x + y;
}

console.log(add(2)); // NaN

//예제 12-19
function add(x, y) {
    return x + y;
}

console.log(add(2, 5, 10)); //7

//예제 12-20
function add(x, y) {
    console.log(arguments);

    return x + y;
}

add(2, 5, 10);

//예제 12-22
function add(x, y) {
    return x + y;
}

console.log(add(2));        //NaN
console.log(add('a', 'b')); //'ab'

//예제 12-23
function add(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        //매개 변수를 통해 전달된 인수의 타입이 부적절한 경우 에러를 발생시킨다.
        throw new TypeError('인수는 모두 숫자 값이어야 합니다.');
    }
    return x + y;
}

console.log(add(2));        //TypeError: 인수는 모두 숫자 값이어야 합니다.
console.log(add('a', 'b')); //TypeError: 인수는 모두 숫자 값이어야 합니다.

//예제 12-25
function add(a = 0, b = 0, c = 0) {
    return a + b + c;

}

console.log(add(1, 2, 3));  //6
console.log(add(1, 2));     //3
console.log(add(1));        //1
console.log(add());         //0

//예제 12-26
$.ajax({
    method: 'POST',
    url: '/user',
    data: { id: 1, name: 'Lee' },
    cache: false
});

//예제 12-27
function multiply(x, y) {
    return x * y;
}

var result = multiply(3, 5);
console.log(result); //15

//예제 12-28

function multiply(x, y) {
    return x * y;
    console.log('실행되지 않는다.');
}

console.log(multiply(3, 5)); //15

//예제 12-29
function foo() {
    return;
}

console.log(foo()); //undefined
//예제 12-30
function foo() {

}

console.log(foo()); //undefined

//예제 12-31
function multiply(x, y) {
    return // return 키워드와 반환값 사이에 줄바꿈이 있으면 세미콜론 자동 삽입 기능(ASI)에 의해 세미콜론이 추가된다.
    x * y; // 무시된다.
    
}

console.log(multiply(3, 5)); //undefined

//예제 12-33
function changeVal(primitive, obj) {
    primitive += 100;
    obj.name = 'Kim';
}

var num = 100;
var person = { name: 'Lee' };

console.log(num); // 100
console.log(person); //  { name: "Lee" }

changeVal(num, person);

console.log(num); // 100
console.log(person); //  { name: "Lee" }

//예제 12-34
// 익명 즉시 실행함수
(function () {
    var a = 3;
    var b = 5;
    return a * b;
}());

//예제 12-42
//즉시 실행함수도 일반 함수처럼 값을 반환할 수 있다.
var res = (function () {
    var a = 3;
    var b = 5;
    return a * b;
}());

console.log(res); //15

//즉시 실행 함수에도 일반 함수처럼 인수를 전달할 수 있다.
res = (function (a, b) {
    return a * b;
}(3,5));

console.log(res); //15

//예제 12-44
function countdown(n) {
    if (n < 0) return;
    console.log(n);
    countdown(n - 1);//재귀 호출
}

countdown(10);

//예제 12-46
//함수 표현식
var factorial = function foo(n) {
    //탈출 조건 : n이 1 이하일 떄 재귀 호출을 멈춘다.
    if (n <= 1) return 1;
    //함수를 가리키는 식별자로 자기 자신을 재귀 호출
    return n * factorial(n - 1);


    //함수 이름으로 자기 자신을 재귀 호출할 수도 있다.
    // console.log(factorial === foo); //true
    // return n * foo(n - 1);


};

console.log(factorial(5)); // 5! = 5*4*3*2*1 = 120

//예제 12-48
function outer() {
    var x = 1;

    //중첩 함수
    function inner() {
        var y = 2;
        console.log(x + y); //3
    }

    inner();
}


outer();

//예제 12-51
//외부에서 전달받은 f를 n만큼 반복 호출한다.
function repeat(n, f) {
    for (var i = 0; i < n; i++){
        f(i);
    }
}

var logAll = function (i) {
    console.log(i);
};

//반복 호출할 함수를 인수로 전달한다.
repeat(5, logAll); //0 1 2 3 4

var logOdds = function (i) {
    if (i % 2) console.log(i);
};

repeat(5, logOdds); // 1 3

//예제 12-53
// logOdds 함수는 단 한 번만 생성된다.
var logOdds = function (i) {
    if (i % 2) console.log(i);
};

repeat(5, logOdds); // 1 3

//예제 12-56
var count = 0;

function increase(n) {
    return ++n;
}

count = increase(count);
console.log(count); //1

count = increase(count);
console.log(count); //2

//예제 12-57
var count = 0;

function increase(n) {
    return ++count; //외부 상태의 의존하며 외부 상태를 변경한다.
}

increase();
console.log(count); //1

increase();
console.log(count); //2

//예제 12-01
//예제 12-01
//예제 12-01
//예제 12-01
