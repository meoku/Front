import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: { top?: number; left?: number; right?: number };
  width?: string;
  height?: string;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div<{
  width?: string;
  height?: string;
  top?: number;
  left?: number;
  right?: number;
}>`
  background: #fff;
  border-radius: 15px;
  border: 1px solid var(--03, #ccc);
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
  position: absolute;
  width: ${(props) => props.width || '500px'};
  height: ${(props) => props.height || 'auto'};
  top: ${(props) => (props.top !== undefined ? `${props.top}px` : '50%')};
  ${(props) =>
    props.left !== undefined
      ? `left: ${props.left}px;`
      : props.right !== undefined
        ? `right: ${props.right}px;`
        : 'left: 50%;'}
  transform: ${(props) =>
    props.top !== undefined && (props.left !== undefined || props.right !== undefined)
      ? 'none'
      : 'translate(-50%, -50%)'};
`;

const Modal = ({ isOpen, onClose, children, position, width, height }: ModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent
        width={width}
        height={height}
        top={position?.top}
        left={position?.left}
        right={position?.right}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
