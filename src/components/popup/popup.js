import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useState, useEffect, useRef } from "react";
import { debounce } from "../utils/utils";

const Popup = ({ children }) => {
  const popupRef = useRef(null);
  const initialPopupRelativeTop = useRef(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleWindowResize = debounce(() => {
      setWindowHeight(window.innerHeight);
    }, 100);

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const getPopupTopPosition = () => {
    let nextRelativeTop = initialPopupRelativeTop.current || 0;

    if (popupRef.current) {
      const popupBoundingBox = popupRef.current.getBoundingClientRect();
      const popupRelativeTop = +popupRef.current.style.top.slice(0, -2); //remove "px" and convert to Number

      if (popupBoundingBox.bottom > windowHeight) {
        nextRelativeTop =
          popupRelativeTop - (popupBoundingBox.bottom - windowHeight);
      } else {
        if (popupBoundingBox.bottom <= windowHeight) {
          nextRelativeTop =
            popupRelativeTop + (windowHeight - popupBoundingBox.bottom);

          nextRelativeTop =
            nextRelativeTop >= initialPopupRelativeTop.current
              ? initialPopupRelativeTop.current
              : nextRelativeTop;
        }
      }
    }

    return nextRelativeTop;
  };

  const updatePopupRef = useCallback((node) => {
    popupRef.current = node;
    if (!initialPopupRelativeTop.current && node) {
      initialPopupRelativeTop.current = node.offsetTop;
      console.log("Initial Top: ", initialPopupRelativeTop.current);
    }
  }, []);

  return (
    <div
      className="popup"
      ref={updatePopupRef}
      style={{
        top: getPopupTopPosition() + "px",
      }}
    >
      <header className="popup__header">
        <span className="popup__title">My Popup</span>
        <button className="btn-cancel-x">
          <FontAwesomeIcon icon={"plus"} transform={{ rotate: 45 }} />
        </button>
      </header>
      <div className="popup__container">{children}</div>
    </div>
  );
};

export default Popup;
