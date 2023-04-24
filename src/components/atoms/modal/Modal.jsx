import React from "react";
const Modal = ({ children }) => {
  const header = React.Children.map(children, (child) =>
    child.type.displayName === "Header" ? child : null
  );
  const body = React.Children.map(children, (child) =>
    child.type.displayName === "Body" ? child : null
  );
  const footer = React.Children.map(children, (child) =>
    child.type.displayName === "Footer" ? child : null
  );

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-black bg-opacity-50">
      <div className="relative w-full h-full max-w-2xl md:h-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            {header}
          </div>
          <div className="p-6 space-y-6">{body}</div>
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ children }) => children;
Header.displayName = "Header";
Modal.Header = Header;

const Body = ({ children }) => children;
Body.displayName = "Body";
Modal.Body = Body;

const Footer = ({ children }) => children;
Footer.displayName = "Footer";
Modal.Footer = Footer;

export default Modal;
