import { Label, TextInput as FlowbiteTextInput } from "flowbite-react";

import { TextFieldProps } from "./TextFieldProps";

export const TextField = ({ label, ...props }: TextFieldProps) => {
  const hasLabel = label !== undefined;

  return (
    <div>
      {hasLabel && (
        <div className="mb-2 block">
          <Label htmlFor={props.id} value={label} />
        </div>
      )}
      <FlowbiteTextInput sizing="sm" {...props} />
    </div>
  );
};
