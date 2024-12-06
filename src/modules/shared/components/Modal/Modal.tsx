import { Button, Modal as FlowbiteModal } from "flowbite-react";

interface ModalProps {
  title?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  body?: React.ReactNode | string;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
}

export const Modal = ({
  open,
  setOpen,
  title,
  body,
  primaryButton,
  secondaryButton,
}: ModalProps) => {
  return (
    <FlowbiteModal
      show={open}
      onClose={() => setOpen(false)}
      size={"sm"}
      position={"center"}
      dismissible
      popup
    >
      <FlowbiteModal.Header className="py-2 px-3">
        {title ? <p>{title}</p> : title}
      </FlowbiteModal.Header>
      {body ? (
        <FlowbiteModal.Body className="py-2 px-3">
          {<p className="text-slate-900 dark:text-slate-300">{body}</p>}
        </FlowbiteModal.Body>
      ) : null}
      <FlowbiteModal.Footer className="py-2 px-3">
        {primaryButton}
        {secondaryButton ? (
          secondaryButton
        ) : (
          <Button size="xs" color="gray" onClick={() => setOpen(false)}>
            {chrome.i18n.getMessage("common_cancel")}
          </Button>
        )}
      </FlowbiteModal.Footer>
    </FlowbiteModal>
  );
};
