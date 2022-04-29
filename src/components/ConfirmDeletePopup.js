import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup(props) {
  return (
    <PopupWithForm
      name="confirm-delete"
      title="Are you Sure?"
      buttonText="Yes"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={props.onSubmit}
    />
  );
}
