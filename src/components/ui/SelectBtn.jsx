import { forwardRef, useId } from "react";
import PropTypes from "prop-types";

const SelectBtn = forwardRef(function SelectBtn(
  { label, options, className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div>
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}
      <select className={` ${className}`} id={id} ref={ref} {...props}>
        {options.map((option) => {
          <option key={option} value={option}>
            {option}
          </option>
        })}
      </select>
    </div>
  );
});

SelectBtn.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string,
};

export default SelectBtn;
