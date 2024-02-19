
function FilterLevel(): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="zero" defaultChecked /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="non-professional" /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="professional" /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
        </label>
      </div>
    </fieldset>
  );
}

export { FilterLevel };
