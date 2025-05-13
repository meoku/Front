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
    <Modal isOpen={isOpen} onClose={onClose} width="372px" height="164px">
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          position: relative;
        `}
      >
        <img
          src="/icMain.svg"
          css={css`
            margin-bottom: 10px;
          `}
        />
        <TextB20>서비스 준비중...</TextB20>
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
