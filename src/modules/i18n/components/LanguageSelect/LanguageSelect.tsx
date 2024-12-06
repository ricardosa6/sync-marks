import { Label, Select } from "flowbite-react";

import { lngs } from "@/modules/i18n/utils";

interface LanguageSelectProps {
  label?: string;
}

export const LanguageSelect = ({ label }: LanguageSelectProps) => {
  const hasLabel = label !== undefined;

  return (
    <div>
      {hasLabel && (
        <div className="mb-2 block">
          <Label htmlFor="languages" value={label} />
        </div>
      )}
      <Select
        id="languages"
        required
        // value={i18n.resolvedLanguage}
        // onChange={(event) => {
        //   i18n.changeLanguage(event.target.value);
        // }}
        sizing="sm"
      >
        {Object.entries(lngs).map(([k, v]) => (
          <option key={k} value={k}>
            {v.nativeName}
          </option>
        ))}
      </Select>
    </div>
  );
};
