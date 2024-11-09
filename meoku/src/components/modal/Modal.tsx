import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: { top: number; left: number };
  width?: string;
  height?: string;
  top?: string;
  right?: string;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
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
}>`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  width: ${(props) => props.width || '500px'};
  height: ${(props) => props.height || 'auto'};
  top: ${(props) => (props.top !== undefined ? `${props.top}px` : '50%')};
  left: ${(props) => (props.left !== undefined ? `${props.left}px` : '50%')};
  transform: ${(props) =>
    props.top !== undefined && props.left !== undefined
      ? 'none'
      : 'translate(-50%, -50%)'};
`;

const Modal = ({
  isOpen,
  onClose,
  children,
  position,
  width,
  height,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        width={width}
        height={height}
        top={position?.top}
        left={position?.left}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
