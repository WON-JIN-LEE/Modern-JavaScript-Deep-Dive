

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
//예제 12-01
//예제 12-01
//예제 12-01
//예제 12-01
