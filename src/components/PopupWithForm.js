export default function PopupWithForm(props) {
  return (
    <div
      className={`modal modal_type_${props.name} ${
        props.isOpen  && "modal_open"
      }`}
    >
      <div className="modal__container">
        <button
          type="button"
          aria-label="close-button"
          className="modal__close-button"
          onClick={props.onClose}
        ></button>
        <h3 className="modal__title">{props.title}</h3>

        <form
          action="#"
          className={`form form-${props.name}`}
          name={`form-${props.name}`}
          noValidate
        >
          {props.children}

          <button
            type="submit"
            className={`form__button form__button_type-${props.name}`}
            // className="form__button form__button_type-edit-profile form__button_disabled"
            // className="form__button form__button_type-add-card form__button_disabled"
            // className="form__button form__button_delete"
            // className="form__button form__button_type-change-avatar form__button_disabled"
            aria-label="delete-button"

          >            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
