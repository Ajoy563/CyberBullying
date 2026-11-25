import { FileImage, FlaskConical, Lightbulb } from "lucide-react";
import { formatDateTime, formatPercent } from "@/utils/format";
import Button from "./Button";
import HighlightedText from "./HighlightedText";
import Modal from "./Modal";
import RiskBadge, { Badge, CategoryChip, StatusBadge, TypeBadge } from "./RiskBadge";
import { Disclaimer, SectionBlock } from "./ResultCard";

/** Read-only detail view of a stored scan record (used by Dashboard, History and Reports). */
export default function ScanDetailsModal({ scan, onClose, onDelete }) {
  if (!scan) return null;

  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      title={`Scan ${scan.id}`}
      description={formatDateTime(scan.createdAt)}
      footer={
        <>
          {onDelete && (
            <Button variant="danger" onClick={() => onDelete(scan)}>
              Delete from history
            </Button>
          )}
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge type={scan.type} />
          <StatusBadge status={scan.status} riskLevel={scan.riskLevel} />
          <RiskBadge level={scan.riskLevel} />
          <Badge tone="aqua">Confidence {formatPercent(scan.confidence)} (simulated)</Badge>
          <Badge tone="iris" icon={FlaskConical}>
            {scan.source === "user" ? "Your demo scan" : "Demo data"}
          </Badge>
        </div>

        {scan.text && (
          <SectionBlock title="Submitted text">
            <div className="rounded-xl border border-line bg-elevated/50 p-4">
              <HighlightedText text={scan.text} highlights={scan.textHighlights} />
            </div>
          </SectionBlock>
        )}

        {scan.fileName && (
          <SectionBlock title="Image">
            <div className="flex items-center gap-3 rounded-xl border border-line bg-elevated/50 p-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-azure/10 text-azure">
                <FileImage size={20} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-fg">{scan.fileName}</p>
                <p className="text-xs text-subtle">Image preview is not stored in demo history.</p>
              </div>
            </div>
          </SectionBlock>
        )}

        {scan.ocrText && (
          <SectionBlock title="OCR extracted text (simulated)">
            <div className="rounded-xl border border-line bg-elevated/50 p-4">
              <HighlightedText text={scan.ocrText} highlights={scan.ocrHighlights} />
            </div>
          </SectionBlock>
        )}

        <SectionBlock title="Detected categories">
          {scan.categories.length ? (
            <div className="flex flex-wrap gap-2">
              {scan.categories.map((c) => (
                <CategoryChip key={c} category={c} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">No harmful categories detected.</p>
          )}
        </SectionBlock>

        <SectionBlock title="Explanation" icon={Lightbulb}>
          <p className="text-sm leading-relaxed text-muted">{scan.explanation}</p>
        </SectionBlock>

        <Disclaimer>
          {scan.source === "user"
            ? "This scan was produced by the demo simulator on this device."
            : "This record is generated sample data shown to demonstrate the interface."}
        </Disclaimer>
      </div>
    </Modal>
  );
}
