import React, { useState } from "react";
import Card from "./Card";
import api from "../utils/Api";
import CurrentUserContext from '../contexts/CurrentUserContext';


export default function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  onCardLike
}) {
  // const [userName, setUserName] = useState("");
  // const [userDescription, setUserDescription] = useState("");
  // const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  const currentUser = React.useContext(CurrentUserContext);


  // React.useEffect(() => {
  //   api
  //     .getData()
  //     .then((userData) => {
  //       setUserName(userData.name);
  //       setUserDescription(userData.about);
  //       setUserAvatar(userData.avatar);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  React.useEffect(() => {
    (async function () {
      try {
        const cardsData = await api.getInitialCards();
        if (cardsData) {
          setCards(cardsData);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    
    // Send a request to the API and getting the updated card data
    if (!isLiked) {
    api.likeCard(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => 
        state.map((currentCard) => 
        currentCard._id === card._id ? newCard : currentCard));
    });
  } else {
    api
      .dislikeCard(card._id)
      .then((newCard) => {
        setCards((state) => 
        state.map((currentCard) => 
        currentCard._id === card._id ? newCard : currentCard));
    });
  }
}

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        setCards((state) => 
        state.filter((currentCard) => 
        currentCard._id === card._id ? newCard : currentCard));
    });
  }

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />

          <button
            onClick={onEditAvatarClick}
            type="button"
            aria-label="edit-avatar-button"
            className="profile__avatar-edit-button"
          ></button>
        </div>

        <div className="profile__info">
          <div>
            <h1 className="profile__name">{currentUser.name}</h1>

            <button
              onClick={onEditProfileClick}
              aria-label="edit-button"
              type="button"
              className="profile__edit-button"
              name="edit"
            ></button>
          </div>

          <h2 className="profile__title">{currentUser.about}</h2>
        </div>

        <button
          onClick={onAddPlaceClick}
          type="button"
          aria-label="add-button"
          className="profile__add-button"
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((element) => (
            <Card 
            card={element} 
            key={element._id} 
            onCardClick={onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
