function formatSearch(searchValue: string) {
  const result = searchValue.toLowerCase().replace(/\s+/g, '');
  return result;
}

export {
  formatSearch,
};
