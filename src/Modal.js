import React from "react";

const Modal = ({
  showModal,
  onCloseModal,
  formData,
  handleInputChange,
  handleSubmit,
  handleDeleteCard,
  formErrors,
}) => {
  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onCloseModal}>
              &times;
            </span>
            <h2>{formData.id ? "Edit Card" : "Add Card"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  required
                />
                {formErrors.title && (
                  <div className="error">{formErrors.title}</div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  required
                />
                {formErrors.description && (
                  <div className="error">{formErrors.description}</div>
                )}
              </div>
              <div className="form-group">
                <select
                  name="column"
                  value={formData.column}
                  onChange={handleInputChange}
                >
                  <option value="column1">Column 1</option>
                  <option value="column2">Column 2</option>
                  <option value="column3">Column 3</option>
                </select>
              </div>
              <button type="submit">{formData.id ? "Edit" : "Add"}</button>
              {formData.id && (
                <button type="button" onClick={handleDeleteCard}>
                  Delete
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
