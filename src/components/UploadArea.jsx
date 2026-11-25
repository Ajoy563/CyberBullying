import { useRef, useState } from "react";
import { CircleAlert, FileImage, ImagePlus, RefreshCw, Trash2, UploadCloud } from "lucide-react";
import { MAX_IMAGE_SIZE_MB } from "@/data/constants";
import { cn } from "@/utils/cn";
import { formatFileSize } from "@/utils/format";
import Button from "./Button";

const FORMATS = ["JPG", "JPEG", "PNG", "WEBP"];

/**
 * Drag-and-drop image uploader with preview.
 * Validation lives in `useImageUpload`; this component is purely presentational.
 */
export default function UploadArea({ file, previewUrl, error, onSelect, onRemove, disabled = false, previewHeight = "h-64" }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const openPicker = () => !disabled && inputRef.current?.click();

  const handleChange = (e) => {
    const picked = e.target.files?.[0];
    if (picked) onSelect(picked);
    e.target.value = ""; // allow re-selecting the same file
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) onSelect(dropped);
  };

  const input = (
    <input
      ref={inputRef}
      type="file"
      accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
      className="sr-only"
      onChange={handleChange}
      tabIndex={-1}
      aria-label="Upload image"
    />
  );

  return (
    <div>
      {file && previewUrl ? (
        <div className="overflow-hidden rounded-2xl border border-line bg-elevated/40">
          <div className={cn("relative overflow-hidden bg-[repeating-conic-gradient(var(--surface-2)_0%_25%,var(--surface)_0%_50%)] bg-[length:20px_20px]", previewHeight)}>
            <img src={previewUrl} alt={`Preview of ${file.name}`} className="absolute inset-0 h-full w-full object-contain" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-azure/10 text-azure">
                <FileImage size={20} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-fg">{file.name}</p>
                <p className="text-xs text-subtle">
                  {formatFileSize(file.size)} · {file.type.replace("image/", "").toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" icon={RefreshCw} onClick={openPicker} disabled={disabled}>
                Replace
              </Button>
              <Button variant="danger" size="sm" icon={Trash2} onClick={onRemove} disabled={disabled}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Drag and drop an image here, or press Enter to browse files"
          onClick={openPicker}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), openPicker())}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-all duration-200",
            dragging ? "scale-[1.01] border-aqua bg-aqua/10" : "border-line bg-elevated/30 hover:border-azure/60 hover:bg-azure/5",
            error && !dragging && "border-danger/50",
            disabled && "pointer-events-none opacity-60",
          )}
        >
          <span
            className={cn(
              "mb-4 grid h-16 w-16 place-items-center rounded-2xl transition-colors",
              dragging ? "bg-aqua/20 text-aqua" : "bg-azure/10 text-azure",
            )}
          >
            {dragging ? <ImagePlus size={30} /> : <UploadCloud size={30} />}
          </span>
          <p className="text-base font-semibold text-fg">{dragging ? "Drop your image here" : "Drag & drop an image here"}</p>
          <p className="mt-1 text-sm text-muted">Screenshots, memes and photos are supported</p>
          <Button
            variant="secondary"
            size="md"
            className="mt-5"
            icon={ImagePlus}
            onClick={(e) => {
              e.stopPropagation();
              openPicker();
            }}
          >
            Browse Files
          </Button>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {FORMATS.map((f) => (
              <span key={f} className="rounded-md border border-line px-2 py-0.5 text-[11px] font-semibold text-subtle">
                {f}
              </span>
            ))}
            <span className="text-xs text-subtle">· Max {MAX_IMAGE_SIZE_MB} MB</span>
          </div>
        </div>
      )}
      {input}

      {error && (
        <p role="alert" className="mt-3 flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-3.5 py-2.5 text-sm text-danger">
          <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
