// foo 식별자가 붙은 레이블 블록문
//예제  08-20
foo: {
    console.log(1);
    break foo;
    console.log(2);

}

console.log('Done!');

//예제 08-21
//outer라는 식별자가 붙은 레이블 for문
outer: for (var i = 0;  i < 3 ; i++) {
    for (var j = 0; j < 3; j++){
        // i + j === 3 이면 outer라는 식별자가 붙은 레이블 for문을 탈출한다.
        if (i + j === 3) break outer;
        console.log(`inner [${i}, ${j}]`);
    }
}

console.log('Done!');

//예제08 - 22
var string = 'Hello World';
var search = 'l';
var index;

for (var i = 0; i < string.length ; i++){
    if(string[i] === search){
        index = i;
        break;
    }
}

console.log(index);
