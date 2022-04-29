export default function ImagePopup(props) {
  return (
      <div
      className={`modal modal_type_${props.name} ${
        props.isOpen && "modal_open"
      }`}
    >

      <div className="modal__image-wrapper">
        <button
          type="button"
          aria-label="close-button"
          className="modal__close-button modal__close-button_type-preview"
          onClick={props.onClose}
        ></button>

        <figure>
          <img 
          src={props.imageLink}
          alt={props.imageText} 
          className="modal__image-container" 
          />
            <figcaption className="modal__image-caption">{props.imageText}</figcaption>
        </figure>
      </div>
    </div>
  );
}