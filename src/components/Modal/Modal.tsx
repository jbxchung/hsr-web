import { FC, MouseEvent, ReactNode, useRef } from 'react';

import './Modal.scss';

interface ModalProps {
  children?: ReactNode;
  closeModal: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const Modal: FC<ModalProps> = (props: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (!modalRef.current?.contains(e.target as Element)) {
      props.closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal" ref={modalRef}>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;