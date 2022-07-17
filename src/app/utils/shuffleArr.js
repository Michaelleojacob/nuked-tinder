export const shuffle = (arr) => {
  let currentIndex = arr.length;
  let randomIndex;

  while (currentIndex !== 0) {
    //pick random element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    //swap it with current element
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }
  return arr;
};
