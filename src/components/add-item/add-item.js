import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";

const AddItem = ({ itemName, isEdit, toggleEdit, onSubmit }) => {
  const [itemText, setItemText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEdit) {
      textareaRef.current.focus();
    }
  });

  const handleOnSubmit = (e) => {
    e?.preventDefault();

    if (itemText) {
      onSubmit(itemText);
      toggleEdit();
      setItemText("");
    }
  };

  const handleOnCancel = () => {
    toggleEdit();
    setItemText("");
  };

  return (
    <article className="add-item">
      {isEdit ? (
        <div>
          <form onSubmit={handleOnSubmit}>
            <textarea
              className="add-item__textarea"
              name="taskCardName"
              cols="20"
              rows="5"
              placeholder={`Enter a title for this ${itemName}...`}
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
        </div>
      ) : (
        <div
          className="add-item__add-button"
          onClick={() => {
            toggleEdit();
          }}
        >
          <FontAwesomeIcon icon={"plus"} size="1x" />
          Add a {itemName}
        </div>
      )}
    </article>
  );
};

export default AddItem;
