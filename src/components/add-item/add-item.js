import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";

const AddItem = ({
  itemName,
  isEdit,
  toggleEdit,
  onSubmit,
  textAreaOptions,
  itemListRef,
}) => {
  const [itemText, setItemText] = useState("");
  const textareaRef = useRef(null);

  const { cols, rows, placeholder } = textAreaOptions;

  useEffect(() => {
    if (isEdit) {
      textareaRef.current.focus();
    }
  });

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
    <article
      className="add-item"
      ref={() => {
        if (itemListRef && itemListRef.current) {
          itemListRef.current.scrollTop = itemListRef.current.scrollHeight;
        }
      }}
    >
      {isEdit ? (
        <>
          <form onSubmit={handleOnSubmit}>
            <textarea
              className="add-item__textarea"
              name="taskCardName"
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
      ) : null}
    </article>
  );
};

export default AddItem;
