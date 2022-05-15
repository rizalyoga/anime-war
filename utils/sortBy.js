const sortBy = (field, reverse, primer) => {
  const key = primer
    ? function (x) {
        return primer(x[field]);
      }
    : function (x) {
        return x[field];
      };

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
  };
};

export default sortBy;

//Now you can sort by any field at will...

// const homes = [
//   { h_id: "3", city: "Dallas", state: "TX", zip: "75201", price: "162500" },
//   { h_id: "4", city: "Bevery Hills", state: "CA", zip: "90210", price: "319250" },
//   { h_id: "5", city: "New York", state: "NY", zip: "00010", price: "962500" },
// ];

// Sort by price high to low
// console.log(homes.sort(sortBy("price", true, parseInt)));

// Sort by city, case-insensitive, A-Z
// console.log(homes.sort(sortBy("city", false, (a) => a.toUpperCase())));
