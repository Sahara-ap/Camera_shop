function pickRandomElement<T>(items:T[]) {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

export {
  pickRandomElement,
};
