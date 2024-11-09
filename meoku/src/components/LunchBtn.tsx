import { css } from '@emotion/react';
import { useRef, useState } from 'react';
import monthBtn from '/monthBtn.svg';
import shareBtn from '/shareBtn.svg';
import icClose from '/icClose.svg';
import Modal from './modal/Modal';

const LunchBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const shareBtnRef = useRef<HTMLImageElement>(null);

  const handleShareClick = () => {
    if (shareBtnRef.current) {
      const rect = shareBtnRef.current.getBoundingClientRect();
      console.log(rect);
      setModalPosition({
        // top: rect.bottom + window.scrollY, // 화면 스크롤을 고려한 Y 위치
        // left: rect.left + window.scrollX, // 화면 스크롤을 고려한 X 위치
        top: rect.top + rect.height,
        left: rect.left - 372,
      });
    }
    setIsModalOpen(true);
  };

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        position: relative;
      `}
    >
      <img
        src={monthBtn}
        css={css`
          width: 52px;
          height: 68px;
          margin-left: 1.5rem;
          margin-right: 1rem;
        `}
      />
      <img
        src={shareBtn}
        ref={shareBtnRef}
        css={css`
          width: 52px;
          height: 68px;
        `}
        onClick={handleShareClick}
      />
      {isModalOpen && (
        <div
          css={css`
            position: absolute;
            top: ${modalPosition.top}px;
            left: ${modalPosition.left}px;
          `}
        >
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            width={'372px'}
            height={'164px'}
            position={{
              top: modalPosition.top,
              left: modalPosition.left,
            }}
            // position.top={`${modalPosition.top}`}
            // position.left={`${modalPosition.left}`}
          >
            <img
              src={icClose}
              css={css`
                position: absolute;
                top: 10px;
                right: 10px;
                cursor: pointer;
              `}
              onClick={() => setIsModalOpen(false)}
            />
            <p>공유하기 팝업 내용</p>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default LunchBtn;
