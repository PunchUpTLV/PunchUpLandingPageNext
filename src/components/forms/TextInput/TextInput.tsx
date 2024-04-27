import React, { HTMLInputTypeAttribute, forwardRef } from "react";

import basic from "./TextInput.module.scss";
import { inputEvent, onKeyDownInput } from "utils/types/inputs";
import BasicInput from "components/Basic/BasicInput/BasicInput";
import BasicInputErrrorMsg from "components/Basic/BasicInputErrrorMsg/BasicInputErrrorMsg";

type Props = {
  value: string | number;
  onChange: (e: inputEvent) => void;
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  showError?: boolean;
  errorMessage?: string;
  extraStyles?: Object;
  onFocus?: () => void;
  onBlur?: () => void;
  type?: HTMLInputTypeAttribute;
  onKeyDown?: (e: onKeyDownInput) => void;
};

const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    value,
    onChange,
    id = "",
    name = "",
    className = "",
    placeholder = "",
    type = "",
    disabled = false,
    showError = false,
    errorMessage = "",
    extraStyles = {},
    onFocus = () => {},
    onBlur = () => {},
    onKeyDown = () => {},
  } = props;

  function styles(className: string) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  return (
    <div className={`${styles("cms-input-wrapper")} ${className}`}>
      <BasicInput
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
        className={className}
        onKeyDown={onKeyDown}
      />
      <BasicInputErrrorMsg showError={showError} errorMessage={errorMessage} />
    </div>
  );
});
TextInput.displayName = "TextInput";

export default TextInput;
