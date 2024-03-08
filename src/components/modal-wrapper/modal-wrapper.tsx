import { useAppSelector } from '../../hooks/store-hooks';
import { getIsAddProductToCartSuccess } from '../../store/modal-windows-store/modal-windows-selectors';
import { ModalAddItemSuccess } from '../modal-add-item-success/modal-add-item-success';
import { ModalAddItem } from '../modal-add-item/modal-add-item';

function ModalWrapper() {
  const isModalSuccessActive = useAppSelector(getIsAddProductToCartSuccess);

  return (
    <>
      <ModalAddItem />
      {isModalSuccessActive && <ModalAddItemSuccess />}
    </>
  );
}

export { ModalWrapper };
