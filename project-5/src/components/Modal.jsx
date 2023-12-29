import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";
const Modal = ({ onClose, isOpen, children }) => {
  return createPortal (
    <>
      {isOpen && (
        <>
          <div className="m-auto z-50 relative min-h-[200px] max-w-[40%]  bg-white p-4">
            <div className="flex justify-end ">
              <AiOutlineClose onClick={onClose} className="text-2xl " />
            </div>
            {children}
          </div>
          <div onClick={onClose} className="absolute top-0 z-60 h-screen w-screen backdrop-blur" />
        </>
      )}
    </>
 ,document.getElementById("modal-root") );
};

export default Modal;
