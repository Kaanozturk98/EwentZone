import { useState, ReactNode, cloneElement, ReactElement } from "react";

export default function Popup(props: {
  title: string;
  body: ReactNode;
  children: ReactElement;
}) {
  const { title = "", body, children } = props;

  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {cloneElement(children, {
        onClick: handleOpen,
      })}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-babyPowder outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-spaceShuttle text-3xl font-semibold">
                    {title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-spaceShuttle float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleClose}
                  >
                    <span className="bg-transparent text-spaceShuttle h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">{body}</div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
