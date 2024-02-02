import { useState } from 'react';
import { TSelectedCard } from '../../types/generalTypes';
import cn from 'classnames';

type TSelectedProductInfoTabsProps = {
  info: TSelectedCard;
}
function SelectedProductInfoTabs({info}:TSelectedProductInfoTabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<'list' | 'text'>('list');
  // const [isButtonTextActive, setIsButtonTextActive] = useState(false);

  function handleListButtonClick() {
    setActiveTab('list');
  }
  function handleTextButtonClick() {
    setActiveTab('text');
  }

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={cn('tabs__control', {'is-active': activeTab === 'list' })}
          type="button"
          onClick={handleListButtonClick}
        >
          Характеристики
        </button>
        <button
          className={cn('tabs__control', {'is-active': activeTab === 'text' })}
          type="button"
          onClick={handleTextButtonClick}
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className={cn('tabs__element', {'is-active': activeTab === 'list'})}>
          <ul className="product__tabs-list">
            <li className="item-list"><span className="item-list__title">Артикул:</span>
              <p className="item-list__text"> {info.vendorCode}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Категория:</span>
              <p className="item-list__text">{info.category}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{info.type}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{info.level}</p>
            </li>
          </ul>
        </div>
        <div className={cn('tabs__element', {'is-active': activeTab === 'text' })}>
          <div className="product__tabs-text">
            <p>{info.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SelectedProductInfoTabs };
