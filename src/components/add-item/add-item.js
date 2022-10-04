import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useState, useRef } from "react";

const AddItem = ({
  itemName,
  toggleEdit,
  onSubmit,
  textAreaOptions,
  itemListRef,
}) => {
  const [itemText, setItemText] = useState("");
  const textareaRef = useRef(null);

  const scrollItemList = useCallback(() => {
    if (itemListRef && itemListRef.current) {
      itemListRef.current.scrollTop = itemListRef.current.scrollHeight;
    }
  }, [itemListRef]);

  const { cols, rows, placeholder } = textAreaOptions;

  const handleOnSubmit = (e) => {
    e?.preventDefault();

    if (itemText) {
      onSubmit(itemText);
      setItemText("");
    }
  };

  const handleOnCancel = () => {
    toggleEdit();
    setItemText("");
  };

  return (
    <article className="add-item">
      <>
        <form onSubmit={handleOnSubmit} ref={scrollItemList}>
          <textarea
            className="add-item__textarea"
            name="taskCardName"
            autoFocus
            cols={cols}
            rows={rows}
            placeholder={placeholder}
            ref={textareaRef}
            value={itemText}
            onChange={(e) => {
              setItemText(e.target.value);
            }}
            onBlur={() => {
              if (itemText) {
                handleOnSubmit();
              } else {
                toggleEdit();
              }
            }}
          ></textarea>
          <div className="add-item__btn-group">
            <button className="btn-action" type="submit">
              Add {itemName}
            </button>
            <button
              className="btn-cancel-x"
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                handleOnCancel();
              }}
            >
              <FontAwesomeIcon icon={"plus"} transform={{ rotate: 45 }} />
            </button>
          </div>
        </form>
      </>
    </article>
  );
};

export default AddItem;
