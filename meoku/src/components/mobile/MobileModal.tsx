import { css } from '@emotion/react';
import LunchTime from '../LunchTime';
interface ModalProps {
  closeModal: () => void;
}
const MobileModal = ({ closeModal }: ModalProps) => {
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;
      `}
      onClick={closeModal}
    >
      <div
        css={css`
          background: white;
          padding: 20px;
          border-radius: 5px;
          max-width: 500px;
          width: 100%;
          text-align: center;
        `}
      >
        {/* <h2>Modal Title</h2>
        <p>This is a simple modal.</p> */}
        <LunchTime />
        <button
          css={css`
            margin-top: 10px;
          `}
          onClick={closeModal}
        >
          닫기
        </button>
      </div>
    </div>
  );
};
export default MobileModal;
