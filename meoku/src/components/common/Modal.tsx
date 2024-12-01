import { useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from "@emotion/react";

type ModalProps = {
  onClose: () => void;
  title: string;
  content: string;
};

export const Modal = ({ 
    onClose,
    title,
    content
}: ModalProps) => {
  // ESC 키로 모달을 닫는 기능 추가
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <span 
            css={css`
            font-size:30px;
            `}>
            {title}
        </span>
        <br></br>
        <hr></hr>
        <span>{content}</span>
        <br></br>
        <button onClick={onClose}>Close</button>
      </ModalContainer>
    </Overlay>
  );
};


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index:1001;
`;
