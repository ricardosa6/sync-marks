import { useState } from "react";
import { Button } from "flowbite-react";
import { useTranslation } from "react-i18next";

import { IconLogout } from "@/modules/shared/icons";
import { useAuthContext } from "@/modules/auth/contexts";
import { Modal } from "@/modules/shared/components";

export const LogoutButton = () => {
  const authContext = useAuthContext();
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useState(false);

  const handleLogout = () => {
    setOpenModal(true);
  };

  const logout = () => {
    authContext?.logout().then(() => {
      setOpenModal(false);
    });
  };

  return (
    <>
      <Button size="sm" gradientMonochrome="failure" onClick={handleLogout}>
        <IconLogout className="h-4 w-4 mr-1" />
        {t("signOut.buttonLabel")}
      </Button>
      <Modal
        title={t("signOut.modal.title")}
        body={t("signOut.modal.message")}
        setOpen={setOpenModal}
        open={openModal}
        primaryButton={
          <Button
            size="xs"
            color="failure"
            onClick={() => {
              logout();
            }}
          >
            <IconLogout className="h-4 w-4 mr-1" />
            {t("signOut.buttonLabel")}
          </Button>
        }
      />
    </>
  );
};
