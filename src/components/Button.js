import PropTypes from "prop-types";

const Button = ({ text, color, backgroundColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn"
      style={{ color: color, backgroundColor: backgroundColor }}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: "steelblue",
  text: "Add Task"
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string
};

export default Button;
