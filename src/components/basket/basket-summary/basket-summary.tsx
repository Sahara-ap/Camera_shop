import { BasketOrder } from '../basket-order/basket-order';
import { BasketPromocode } from '../basket-promocode/basket-promocode';

function BasketSummary(): JSX.Element {
  return (
    <div className="basket__summary">
      <BasketPromocode />
      <BasketOrder />
    </div>
  );
}

export { BasketSummary };
