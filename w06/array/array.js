//.forEach
const steps = ['one', 'two', 'three'];

// steps.forEach(function(item){
//     console.log(item);
// });

steps.forEach(showSteps);

function showSteps(item){
    console.log(item);
};

//.map

let myList = document.querySelector('#my-list');

const stepsHtml = steps.map(listTemplate);

function listTemplate(item){
    return `<li>${item}</li>`;
};

myList.innerHTML = stepsHtml.join('');

let grades = ['A', 'B', 'C'];
let points;

let gpaPoints = grades.map(convert);

function convert(grade) {
    switch (grade){
        case 'A':
            points = 4;
            break;
        case 'B':
            points = 3;
            break;
        case 'C':
            points = 2;
            break;
        case 'D':
            points = 1;
            break;
        case 'F':
            points = 0;
            break;
        default:
            alert('not a valid grade');
    }
    return points;
}

console.log(gpaPoints);

//.reduce

let totalPoints = gpaPoints.reduce(getTotal);

function getTotal(total, points){
    return total + points;
};
console.log(totalPoints);

