
function FilterCategory(): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>

      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name="photocamera"
            onChange={handleFilterToggle}
            checked={checkedList.includes(filterId)}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Фотокамера</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name="videocamera"
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Видеокамера</span>
        </label>
      </div>
    </fieldset>
  );
}

export { FilterCategory };
