import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import api from "../utils/Api";
import CurrentUserContext from '../contexts/CurrentUserContext';



function App() {
  //determine the presence of the CSS visibility class and specifies the image address in the img tag.
  const [selectedCard, setSelectedCard] = React.useState({});

  // state variables responsible for the visibility of three popups:
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

    const [isPreviewImageOpen, setIsPreviewImageOpen] =
    React.useState(false);

//**----------->> API <<-------------------*/

    const [currentUser, setCurrentUser] = React.useState({});
    React.useEffect(() => {
      api
        .getData()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

//**----------->> MODALS <<-------------------*/

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsPreviewImageOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPreviewImageOpen(false)

    setSelectedCard({});
  }

  React.useEffect(() => {
    // code on mount
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    // code on unmount
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []); // dependencies array


//**----------->> RENDER <<-------------------*/

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <div className="main">
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />

        {/* <!-- MODAL POPUP EDIT PROFILE --> */}
        <PopupWithForm
          name="edit-profile"
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          title="Edit profile"
          buttonText="Save"
        >
          <input
            id="input_type_name"
            type="text"
            className="form__input form__input_type_name"
            placeholder="name"
            name="name"
            minLength="2"
            maxLength="40"
            required
          />
          <span id="input_type_name-error" className="form__error"></span>
          <input
            id="input_type_job"
            type="text"
            className="form__input form__input_type_job"
            placeholder="profession"
            name="job"
            minLength="2"
            maxLength="200"
            required
          />
          <span id="input_type_job-error" className="form__error"></span>
        </PopupWithForm>

        {/* <!-- MODAL POPUP ADD PLACE CARD --> */}
        <PopupWithForm
          name="add-place"
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          title="New place"
          buttonText="Create"
        >
          <input
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
            id="input_type_url"
            type="url"
            className="form__input form__input_type_link"
            placeholder="Image link"
            name="link"
            required
          />
          <span id="input_type_url-error" className="form__error"></span>
        </PopupWithForm>

        {
          /* <!-- MODAL POPUP CONFIRM DELETE CARD --> */
          /* 
      // name="confirm-delete" */
          // "Are you sure?" (optional)
        }

        {/* <!-- MODAL POPUP EDIT AVATAR --> */}
        <PopupWithForm
          name="edit-avatar"
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          title="Change profile picture"
          buttonText="Save"
        >
          <input
            id="input_type_avatar-url"
            type="url"
            className="form__input form__input_type_link"
            placeholder="avatar link"
            name="link"
            required
          />
          <span id="input_type_avatar-url-error" className="form__error"></span>
        </PopupWithForm>

        <ImagePopup
          name="preview-image"
          onClose={closeAllPopups}
          isOpen={isPreviewImageOpen}
          imageLink={selectedCard.link}
          imageText={selectedCard.name}
          
          />
        <Footer />
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
