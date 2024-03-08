import { useAppSelector } from '../../hooks/store-hooks';
import { getIsAddProductToCartSuccess, getIsBuyProductActive } from '../../store/modal-windows-store/modal-windows-selectors';

import { ModalAddItemSuccess } from '../modal-add-item-success/modal-add-item-success';
import { ModalAddItem } from '../modal-add-item/modal-add-item';

function ModalWrapper() {
  const isAddModalActive = useAppSelector(getIsBuyProductActive);
  const isAddModalSuccessActive = useAppSelector(getIsAddProductToCartSuccess);

  return (
    <>
      {isAddModalActive && <ModalAddItem />}
      {isAddModalSuccessActive && <ModalAddItemSuccess />}
    </>
  );
}

export { ModalWrapper };
