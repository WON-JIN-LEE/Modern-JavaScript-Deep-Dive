

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

//예제 12-01
//예제 12-01
//예제 12-01
//예제 12-01
//예제 12-01
//예제 12-01
//예제 12-01
