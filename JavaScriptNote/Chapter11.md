# 11장 원시값과 객체의 비교

## 11.1 원시값

## 11.1.1 변경 불가능한 값

    -원시 타입의 값, 측 원시 값은 변경 불가능한 값이다.
    -변경 불가능하다는 것은 변수가 아니라 값에 대한 진술이다.
    -단, 변수는 언제든지 재할당을 통해 변수 값을 변경할 수 있지만 상수는 단 한번만 할당이 허용되므로 변수 값을 변경할 수 없다
    -상수는 재할당이 금지된 변수일뿐이다.
    -변수 값을 변경하기 위해 원시 값을 재할당하면 새로운 메모리 공간을 확보하고 재할당한 값을 저장한 후, 변수가 참조하던 메모리 공간의 주소를 변경한다. 값의 이러한 특성을 불변성이라한다.
    -불변성을 갖는 워시 값을 할당한 변수는 재할당 이외에 변수 값 변경할 수 있는 방법이 없다.

### 예제 11-01

```javascript
//  const 키워드를 사용해 선언한 변수는 재할당이 금지된다. 상수는 재할당이 금지된 변수일 뿐이다.
const o = {};
//const 키워드를 사용해 선언한 변수에 할당한 원시 값은 변경할 수 없다
//하지만 const키워드를 사용해 선언한 변수에 할당한 객체는 변경할 수 있다.
o.a = 1;
console.log(o);
```

<!-- Line -->

---

## 11.1.2 문자열과 불변성

    -자바스크립트의 문자열은 원시 타입이며, 변경 불가능하다.
    -유사 배열 객체란 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고, length프로퍼티를 갖는 객체를 말한다.

### 예제 11-04

```javascript
var str = "string";

console.log(str[0]);

console.log(str.length);
console.log(str.toUpperCase());
```

### 예제 11-05

```javascript
var str = "string";

str[0] = "S";
console.log(str);
```

<!-- Line -->

---

## 11.1.3 값에 의한 전달

    -엄격하게 표현하면 변수에는 값이 전달되는 것이 아니라 메모리 주소가 전달되기 때문이다. 이는 변수와 같은 식별자는 값이 아니라 메모리 주소를 기억하고 있기 때문이다.
    -값의 의한 전달도 사실은 값을 전달하는 것이 아니라 메모리 주소를 전달한다. 단, 전달된 메모리 주소를 통해 메모리 공간에 접근하면 값을 참조할 수 있다.
    -결국은 두 변수의 원시 값은 서로 다른 메모리 공간에 저장된 별개의 값이 되어 어느한쪽에서 재할당을 통해 값을 변경하더라도 서로 간섭할 수 없다.

### 예제 11-08

```javascript
var score = 80;

var copy = score;
console.log(score, copy); // 80 80
console.log(score === copy); // true

score = 100;
console.log(score, copy); // 100 80
console.log(score === copy); // fales
```

<!-- Line -->

---

## 11.2 객체

    -객체는 프로퍼티의 개수가 정해져 있지 않으며, 동적으로 추가되고 삭제할 수 있다.
    -자바스크립트는 클래스 없이 객체를 생성할 수 있으며 객체가 생성된 이후라도 동적으로 프로퍼티와 메서드를 추가할 수 있다.

<!-- Line -->

---

## 11.2.1 변경 가능한 값

    -객체 타입의 값, 즉 객체는 변경 가능한 값이다.
    -원시 값을 할당한 변수가 기억하는 메모리 주소를 통해 메모리 공간에 접근하면 원시 값에 접근할 수 있다.
    -객체를 할당한 변수가 기억하는 메모리 주소를 통해 메모리 공간에 접근하면 참조 값에 접근할 수 있다.
    -원시 값은 변경 불가능한 값이므로 원시 값을 갖는 변수의 값을 변경하려면 재할당 외에는 방법이 없다.
    -따라서 객체를 할당한 변수는 재할당 없이 객체를 직접 변경할 수 있다. 즉 재할당 없이 프로퍼티를 동적으로 추가할 수도 있고 프로퍼티 값을 갱신할 수도 있으며 프로퍼티 자체를 삭제할 수도 있다.
    -원시 값과는 다르게 여러개의 식별자가 하나의 객체를 공유할 수 있다.
    -객체를 프로퍼티 값으로 갖는 객체의 경우 얕은 복사는 한 단계까지만 복사하는 것을 말하고 깊은 복사는 객체에 중접되어 있는 객체까지 모두 복사하는 것을 말한다.

### 예제 11-13

```javascript
var person = {
  name: "Lee",
};

//프로퍼티 값 갱신
person.name = "Kim";

//프로퍼티 동적 생성
person.address = "Seoul";

console.log(person); // { name: 'Kim', address: 'Seoul' }
```

<!-- Line -->

---

## 11.2.2 참조에 의한 전달

    -"값에 의한 전달"과 "참조에 의한 전달"은 식별자가 기억하는 메모리 공간에 저장되어 있는 값을 복사해서 전달한다는 면에서 동일하다, 다만 식별자가 기억하는 메모리 공강, 즉 변수에 저장되어 있는 값이 원시 값이냐 참조 값이냐의 차이만 있을 뿐이다.
    -객체를 할당한 변수를 비교하면 참조 값을 비교하고, 원시 값을 할당한 변수를 비교하면 원시 값을 비교한다.

### 예제 11-17

```javascript
var person = {
  name: "Lee",
};
//참조 값을 복사. 동일한 참조 값을 갖는다
var copy = person;

console.log(copy === person); //true

//copy흫 통해 객체를 변경한다.
copy.name = "Kim";

//person을 통해 객체를 변경한다.
person.address = "Seoul";

//copy와 person은 동일한 객체를 가리킨다.
//따라서 어느 한쪽에서 객체를 변경하면 서로 영향을 주고 받는다.

console.log(copy); // { name: 'Kim', address: 'Seoul' }
console.log(person); // { name: 'Kim', address: 'Seoul' }
```

### 예제 11-18

```javascript
var person1 = {
  name: "Lee",
};

var person2 = {
  name: "Lee",
};

console.log(person1 === person2); // false
console.log(person1.name === person2.name); //true
```