import React from "react";
import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";

const Input = ({ name, control, rules, label, type }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <>
          <label
            htmlFor={field.name}
            className={fieldState.error ? "p-error" : ""}
          ></label>
          <span className="p-float-label">
            <InputText
              id={field.name}
              value={field.value}
              type={type ? type : "text"}
              className={`form-control ${
                fieldState.error ? "is-invalid" : ""
              } me-3 mb-3 p-inputtext-sm`}
              onChange={(e) => field.onChange(e.target.value)}
            />
            <label htmlFor={field.name}>{label}</label>
          </span>
          {fieldState.error && (
            <span className="p-error">{fieldState.error.message}</span>
          )}
        </>
      )}
    />
  );
};

export default Input;
