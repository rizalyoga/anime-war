console.log("a");
setTimeout(() => {
  console.log("c");
}, 0);
console.log("b");

const numbers = [1, 2, 3];

const sum = (arr) => {
  let res = 0;
  arr.forEach((el) => {
    res += el;
  });
  return res;
};

// console.log(sum(...numbers, numbers));
console.log(...numbers, 4);
