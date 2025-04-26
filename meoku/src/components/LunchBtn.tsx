import { css } from '@emotion/react';
import { useRef, useState } from 'react';
import monthBtn from '/monthBtn.svg';
import shareBtn from '/shareBtn.svg';
import icClose from '/icClose.svg';
import Modal from './modal/Modal';
import { TextB20, TextR14 } from './common/Text';

const LunchBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
  const shareBtnRef = useRef<HTMLImageElement>(null);

  const handleShareClick = () => {
    if (shareBtnRef.current) {
      const rect = shareBtnRef.current.getBoundingClientRect();
      const value = 1560 - rect.right;
      setModalPosition({
        top: 230,
        right: 380 - value,
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
        <div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            width={'372px'}
            height={'164px'}
            position={{
              top: modalPosition.top,
              right: modalPosition.right,
            }}
          >
            <div
              css={css`
                display: flex;
                justify-content: center;
                width: 100%;
                height: 24px;
                margin-top: 42px;
              `}
            >
              <TextB20
                css={css`
                  color: #666666;
                `}
              >
                공유하기
              </TextB20>
            </div>
            <div
              css={css`
                display: flex;
                justify-content: flex-end;
                margin-top: 18px;
                margin-left: 24px;
                width: 320px;
                height: 40px;
                border-radius: 6px;
                border: 1px solid var(--03, #ccc);
                background: var(--08, #fff);
              `}
            >
              <TextR14
                css={css`
                  position: absolute;
                  top: 98px;
                  left: 50px;
                  width: 180px;
                  height: 16px;
                  flex-shrink: 0;
                  color: #666666;
                `}
              >
                https://www.meoku.info/
              </TextR14>
              <button
                css={css`
                  width: 60px;
                  height: 40px;
                  flex-shrink: 0;
                  border-radius: 6px;
                  border: 0.75px solid var(--03, #ccc);
                  background: var(--02, #f0efee);
                `}
                onClick={() => {
                  navigator.clipboard.writeText('https://www.meoku.info/');
                }}
              >
                <TextR14
                  css={css`
                    position: absolute;
                    top: 96px;
                    right: 42px;
                    width: 28px;
                    height: 20px;
                    color: #666666;
                  `}
                >
                  복사
                </TextR14>
              </button>
            </div>
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
          </Modal>
        </div>
      )}
    </div>
  );
};

export default LunchBtn;
