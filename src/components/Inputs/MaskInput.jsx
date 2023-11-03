import React from "react";
import { Controller } from "react-hook-form";
import { InputMask } from "primereact/inputmask";

const MaskInput = ({ name, control, mask, placeholder, errors }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: `${placeholder} é Obrigatório.` }}
      render={({ field, fieldState }) => (
        <>
          <label
            htmlFor={field.name}
            className={fieldState.error ? "p-error" : ""}
          ></label>
          <InputMask
            id={field.name}
            value={field.value}
            className={`form-control ${
              fieldState.error ? "is-invalid" : ""
            } me-3 mb-3 p-inputtext-sm`}
            onChange={(e) => field.onChange(e.target.value)}
            mask={mask}
            placeholder={placeholder}
          />
          {errors && errors[name] && (
            <small className="p-error">{errors[name].message}</small>
          )}
        </>
      )}
    />
  );
};

export default MaskInput;
