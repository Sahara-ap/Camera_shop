
function FilterType(): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="digital" defaultChecked /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="film" disabled /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="snapshot" /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="collection" defaultChecked disabled /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
        </label>
      </div>
    </fieldset>
  );
}

export { FilterType };
