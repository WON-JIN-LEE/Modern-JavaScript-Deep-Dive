// 예제 10-03
var person = {
    //프로퍼티 키는 name,프로퍼티 값은  'lee' 
    name: 'lee',
    //프로퍼티 키는 age,프로퍼티 값은  20 
    age: 20
};


// 예제 10-04
var person = {
    //식별자 네이밍 규칙을 준수하는 프로퍼티 키 
    firstName: 'Ung-mo',
    //식별자 네이밍 규칙을 준수하지 않은 프로퍼티 키 
    'last-name': 'Lee'
}; 
console.log(person); // {firsrName: "Ung-mo", last-name : "Lee"}

//예제 10-06
var obj = {};
var key = 'hello';

//ES5 : 프로퍼티 키 동적 생성
obj[key] = 'world';
//ES6 계산된 프로퍼티 이름
//var obj={[key]: 'world'};

console.log(obj); // {hello: "world"}

//예제 10-10
var foo = {
    name: 'Lee',
    name: 'kim'
};

console.log(foo); //{ name: "kim"}

//예제 10-11
var circle = {
    radius: 5,
    getDiameter: function () {
        return 2 * this.radius;
    }
};

console.log(circle.getDiameter()); // 10


//예제 10-12
var person = {
    name: 'lee',

};

console.log(person.name); // Lee
console.log(person['name']);

//예제 10-16
var person = {
    name: 'lee',

};
//person객체에 name프로퍼티가 존재하므로 name프로퍼티의 값이 갱신된다.
person.name = 'kim';
console.log(person); //{name: "kim"}
//예제 10-17
var person = {
    name: 'lee',

};
//person객체에 age 프로퍼티가 존재하지 않는다.
//따라서 person 객체에 age프로퍼티가 동적으로 생성되고 값이 할당된다.
person.age = 20;
console.log(person); //{name: "kim", age: 20}

//예제 10-18
var person = {
    name: 'lee',

};

person.age = 20;

//delete 연산자로 age프로퍼티를 삭제할 수 있다.
delete person.age;

//delete 연산자로 address 프로퍼티를 삭제할 수 없다. 이때 에러가 발생하지 않는다.
delete person.address;
    
//예제 10-19
//ES5
var x = 1, y = 2;

var obj = {
    x: x,
    y: y
};

console.log(obj); //{x: 1, y: 2}

//예제 10-20
//ES6
var x = 1, y = 2;

var obj = {x, y};

console.log(obj); //{x: 1, y: 2}

//예제 10-21
//ES5
var prefix = 'prop';
var i=0;

var obj = {};

obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;
console.log(obj); //{prop-1: 1, prop-2: 2, prop-3: 3}
//예제 10-22
//ES6
var prefix = 'prop';
var i=0;

var obj = {
[`${prefix }- ${++i}`] : i,
[`${prefix}- ${++i}`]: i,
[`${prefix }- ${++i}`] : i,
};
console.log(obj); //{prop-1: 1, prop-2: 2, prop-3: 3}

//예제 10-23
//ES5
var obj = {
    name: 'Lee',
    sayHi: function () {
        console.log('Hi!' + this.name);
    }
};

obj.sayHi();// Hi! Lee

//예제 10-24

//ES6
var obj = {
    name: 'Lee',
    //메서드 축약표현
    sayHi() {
        console.log('Hi!' + this.name);
    }
};

obj.sayHi();// Hi! Lee
