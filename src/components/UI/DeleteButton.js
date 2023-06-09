const DeleteButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      style={{ position: "absolute", top: 4, right: 4, cursor: "pointer" }}
    >
      X
    </button>
  );
};

export default DeleteButton;
