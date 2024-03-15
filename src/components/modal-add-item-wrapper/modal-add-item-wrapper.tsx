import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getIsAddProductToCartSuccess, getIsBuyProductActive } from '../../store/modal-windows-store/modal-windows-selectors';
import { setIsAddProductToCartSuccess } from '../../store/modal-windows-store/modal-windows-slice';

import { ModalAddItemSuccess } from '../modal-add-item-success/modal-add-item-success';
import { ModalAddItem } from '../modal-add-item/modal-add-item';

function ModalAddItemWrapper() {
  const dispatch = useAppDispatch();
  const isAddModalActive = useAppSelector(getIsBuyProductActive);
  const isAddModalSuccessActive = useAppSelector(getIsAddProductToCartSuccess);

  function closeModal () {
    dispatch(setIsAddProductToCartSuccess(false));
  }

  return (
    <>
      {isAddModalActive && <ModalAddItem />}
      {isAddModalSuccessActive && <ModalAddItemSuccess onLinkClick={closeModal}/>}
    </>
  );
}

export { ModalAddItemWrapper };
