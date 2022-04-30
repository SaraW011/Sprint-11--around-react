import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault();

    // Pass the values of the managed components to the external handler
    props.onAddPlaceSubmit({
      name: cardName,
      link: cardLink,
    });
  }
    //clear the inputs based on isOpen props 
    React.useEffect(() => {
      setCardName('');
      setCardLink('');
    }, [props.isOpen]);

  function handleCardNameUpdate(e) {
    setCardName(e.target.value);
  }

  function handleCardLinkUpdate(e) {
    setCardLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="add-place"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      title="New place"
      buttonText="Create"
    >
      <input
        onChange={handleCardNameUpdate}
        id="input_type_place"
        type="text"
        className="form__input form__input_type_place"
        placeholder="Title"
        name="place"
        minLength="1"
        maxLength="30"
        required
      />
      <span id="input_type_place-error" className="form__error"></span>
      <input
        onChange={handleCardLinkUpdate}
        id="input_type_url"
        type="url"
        className="form__input form__input_type_link"
        placeholder="Image link"
        name="link"
        required
      />
      <span id="input_type_url-error" className="form__error"></span>
    </PopupWithForm>
  );
}
