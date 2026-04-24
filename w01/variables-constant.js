const PI = 3.14;
let radius = 3;

let area = PI * radius * radius;

console.log(area);

radius = 20;
area = PI * radius * radius;

console.log(area);

// type coersion: the code inferrs that the string is supposed to be an integer and converts it to one before multiplying it by the number
const one = 1;
const two = '2';

let result = one * two;
console.log(result);

//concatenation: the code inferrs that the number is supposed to be a string and converts it to one before concatenating it with the other string
result = one + two;
console.log(result);

result = one + Number(two);
console.log(result);



let course = "CSE131"; //global scope
if (true) {
    let student = "John";
    console.log(course);  //works just fine, course is global
    console.log(student); //works just fine, it's being accessed within the block
}
console.log(course); //works fine, course is global
console.log(student); //does not work, can't access a block variable outside the block
                    