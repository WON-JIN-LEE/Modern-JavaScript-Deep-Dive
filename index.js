
//예제 11-01

//  const 키워드를 사용해 선언한 변수는 재할당이 금지된다. 상수는 재할당이 금지된 변수일 뿐이다.
const o = {};
//const 키워드를 사용해 선언한 변수에 할당한 원시 값은 변경할 수 없다
//하지만 const키워드를 사용해 선언한 변수에 할당한 객체는 변경할 수 있다.
o.a = 1;
console.log(o);

//예제 11-04
var str = 'string';

console.log(str[0]);

console.log(str.length);
console.log(str.toUpperCase());


//예제 11-05
var str = 'string';

str[0] = 'S';
console.log(str);

//예제 11-08
var score = 80;

var copy = score;
console.log(score, copy); // 80 80
console.log(score === copy); // true

score = 100;
console.log(score, copy); // 100 80
console.log(score === copy); // fales

//예제 11-13
var person = {
    name: 'Lee'
};

//프로퍼티 값 갱신
person.name = 'Kim';

//프로퍼티 동적 생성
person.address = 'Seoul';

console.log(person); // { name: 'Kim', address: 'Seoul' }


//예제 11-17
var person = {
    name: 'Lee'
};
//참조 값을 복사. 동일한 참조 값을 갖는다
var copy = person;

console.log(copy === person); //true

//copy흫 통해 객체를 변경한다.
copy.name = 'Kim';

//person을 통해 객체를 변경한다.
person.address = 'Seoul';

//copy와 person은 동일한 객체를 가리킨다.
//따라서 어느 한쪽에서 객체를 변경하면 서로 영향을 주고 받는다.

console.log(copy); // { name: 'Kim', address: 'Seoul' }
console.log(person); // { name: 'Kim', address: 'Seoul' }

//예제 11-18

var person1 = {
    name: 'Lee'
};

var person2 = {
    name: 'Lee'
};

console.log(person1 === person2); // false
console.log(person1.name === person2.name); //true