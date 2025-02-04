const Button = ({ children, type, classNames, onClick }) => {
  return (
    <button type={type} className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
