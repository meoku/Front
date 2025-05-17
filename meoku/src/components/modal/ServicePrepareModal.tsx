import { css } from '@emotion/react';
import { TextB20 } from '../common/Text';
import Modal from '../modal/Modal';
import icClose from '/icClose.svg';

interface ServicePrepareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServicePrepareModal = ({ isOpen, onClose }: ServicePrepareModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="372px" height="240px">
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          height: 100%;
          position: relative;
        `}
      >
        <img
          src="/icMain.svg"
          css={css`
            width: 57px;
            height: 63px;
            margin-top: 48px;
          `}
        />
        <TextB20
          css={css`
            color: #666666;
            // margin-top: 17px;
            position: absolute;
            top: 128px;
            text-align: center;
            font-size: 20px;
          `}
        >
          서비스 준비중...
        </TextB20>
        <p
          css={css`
            color: #666666;
            text-align: center;
            line-height: 135%;
            font-size: 14px;
            font-weight: normal;
            position: absolute;
            top: 164px;
            font-size: 14px;
          `}
        >
          보다 나은 서비스 제공을 위해, 페이지 준비중입니다.
          <br />
          새로운 서비스로 곧 다시 인사드리겠습니다.
        </p>
        <img
          src={icClose}
          css={css`
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
          `}
          onClick={onClose}
        />
      </div>
    </Modal>
  );
};

export default ServicePrepareModal;
