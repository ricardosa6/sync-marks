import { Label, Select } from "flowbite-react";

import { useTranslation } from "react-i18next";

export const LanguageSelect = () => {
  const { t, i18n } = useTranslation();

  const lngs = {
    en: { name: t("languages.en"), nativeName: "English" },
    es: { name: t("languages.es"), nativeName: "Español" },
  };

  return (
    <div>
      <div className="mb-2 block">
        <Label
          htmlFor="languages"
          value={t("settings.fields.languagesLabel")}
        />
      </div>
      <Select
        id="languages"
        required
        value={i18n.resolvedLanguage}
        onChange={(event) => {
          i18n.changeLanguage(event.target.value);
        }}
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
