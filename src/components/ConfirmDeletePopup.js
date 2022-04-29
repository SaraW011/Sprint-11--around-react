import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup({ isOpen, onClose, onSubmit }) {
  return (
    <PopupWithForm
      name="confirm-delete"
      title="Are you Sure?"
      buttonText="Yes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
