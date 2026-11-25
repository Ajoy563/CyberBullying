import { TriangleAlert } from "lucide-react";
import Button from "./Button";
import Modal from "./Modal";

/** Confirmation modal for destructive actions. */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      open={open}
      onClose={loading ? undefined : onCancel}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant="dangerSolid" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-danger/10 text-danger">
          <TriangleAlert size={22} />
        </span>
        <p className="text-sm leading-relaxed text-muted">{message}</p>
      </div>
    </Modal>
  );
}
