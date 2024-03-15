import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getIsReviewModalActive, getIsReviewModalSuccessActive } from '../../store/modal-windows-store/modal-windows-selectors';
import { setIsReviewModalSuccessActive } from '../../store/modal-windows-store/modal-windows-slice';

import { ModalReviewSuccess } from '../modal-review-success/modal-review-success';
import { ModalReview } from '../modal-review/modal-review';

function ModalReviewWrapper() {
  const dispatch = useAppDispatch();
  const isModalReviewActive = useAppSelector(getIsReviewModalActive);
  const isModalReviewSuccessActive = useAppSelector(getIsReviewModalSuccessActive);

  function closeModal () {
    dispatch(setIsReviewModalSuccessActive(false));
  }

  return (
    <>
      {isModalReviewActive && <ModalReview />}
      {isModalReviewSuccessActive && <ModalReviewSuccess onLinkClick={closeModal}/>}
    </>
  );
}

export {ModalReviewWrapper};
