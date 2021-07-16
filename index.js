let grandeur = { engine: "gdi", cc: 3000 };
let aa = { name: "kildong", age: 20, car: grandeur };
let bb = JSON.parse(JSON.stringify(aa)); // Object Deep Copy, 하위Object Deep Copy

console.log(Object.is(aa, bb)); // false
console.log(Object.is(aa.car, bb.car)); // false