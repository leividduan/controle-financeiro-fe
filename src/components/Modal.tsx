import { useNavigate } from 'react-router-dom';

interface ModalProps {
  children: any,
  title: string,
  confirmLabel: string,
  cancelLabel: string,
  formFor?: string,
  confirmFn?: any
}

function Modal({children, title, confirmLabel, cancelLabel, formFor, confirmFn}:ModalProps) {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center bg-black bg-opacity-5 backdrop-blur">
      <div className=" bg-white rounded-lg p-5 w-[800px]">
        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button type="button" onClick={() => navigate(-1)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div className="p-4 space-y-4">
          {children}
        </div>
        <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button form={formFor} onClick={confirmFn} type="submit" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-primary-400 disabled:cursor-not-allowed">{confirmLabel}</button>
          <button onClick={() => navigate(-1)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">{cancelLabel}</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;