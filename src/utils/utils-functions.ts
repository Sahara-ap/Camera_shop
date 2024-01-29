function formatPrice(value: number) {
  return value.toLocaleString('ru');
}

function pickRandomElement<T>(items:T[]) {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

export {
  formatPrice,
  pickRandomElement,
};
