import PropTypes from "prop-types";

function Button({
  text,
  type = "button",
  bgColor = "bg-black",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`focus-visible:outline-black"> + rounded-md px-3 py-2 text-sm font-semibold shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${bgColor} ${textColor} ${className}`}
      type={type}
      {...props}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
