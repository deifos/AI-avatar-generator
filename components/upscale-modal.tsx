"use clientt";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface UpscaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (scale: number) => void;
}

export function UpscaleModal({
  isOpen,
  onClose,
  onConfirm,
}: UpscaleModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enhance Image Quality</DialogTitle>
          <DialogDescription>
            Would you like to upscale the image to 4x resolution for better
            quality? This may take a moment to process.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onConfirm(1);
              onClose();
            }}
          >
            No, Keep Original
          </Button>
          <Button
            onClick={() => {
              onConfirm(4);
              onClose();
            }}
          >
            Yes, Enhance (4x)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
