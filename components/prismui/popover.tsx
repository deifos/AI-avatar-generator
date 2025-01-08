"use client";

import * as React from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const TRANSITION = {
  type: "spring",
  bounce: 0.1,
  duration: 0.4,
};

interface PopoverContextType {
  isOpen: boolean;
  openPopover: () => void;
  closePopover: () => void;
  uniqueId: string;
  note: string;
  setNote: (note: string) => void;
}

const PopoverContext = React.createContext<PopoverContextType | undefined>(
  undefined
);

function usePopoverLogic() {
  const uniqueId = React.useId();
  const [isOpen, setIsOpen] = React.useState(false);
  const [note, setNote] = React.useState("");

  const openPopover = () => setIsOpen(true);
  const closePopover = () => {
    setIsOpen(false);
    setNote("");
  };

  return {
    isOpen,
    openPopover,
    closePopover,
    uniqueId,
    note,
    setNote,
  };
}

interface PopoverRootProps {
  children: React.ReactNode;
}

export function PopoverRoot({ children }: PopoverRootProps) {
  const popoverLogic = usePopoverLogic();

  return (
    <PopoverContext.Provider value={popoverLogic}>
      <MotionConfig transition={TRANSITION}>
        <div className="relative">{children}</div>
      </MotionConfig>
    </PopoverContext.Provider>
  );
}

interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost";
}

export function PopoverTrigger({
  children,
  className,
  variant = "default",
  ...props
}: PopoverTriggerProps) {
  const { openPopover, uniqueId } = React.useContext(PopoverContext)!;

  return (
    <motion.div layoutId={`popover-trigger-${uniqueId}`}>
      <Button
        variant={variant}
        className={className}
        onClick={openPopover}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

export function PopoverContent({ children, className }: PopoverContentProps) {
  const { isOpen, closePopover, uniqueId } = React.useContext(PopoverContext)!;
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        closePopover();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePopover]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopover();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closePopover]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(4px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-black/5"
          />
          <motion.div
            ref={contentRef}
            layoutId={`popover-${uniqueId}`}
            className={cn(
              "fixed z-50 min-w-[200px] overflow-hidden rounded-lg border border-border bg-background shadow-lg outline-none",
              className
            )}
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface PopoverFormProps {
  children: React.ReactNode;
  onSubmit?: ((note: string) => void) | ((e: React.FormEvent) => void);
}

export function PopoverForm({ children, onSubmit }: PopoverFormProps) {
  const { note, closePopover } = React.useContext(PopoverContext)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      if (onSubmit.length === 1) {
        (onSubmit as (note: string) => void)(note);
      } else {
        (onSubmit as (e: React.FormEvent) => void)(e);
      }
    }
    closePopover();
  };

  return (
    <form className="flex h-full flex-col" onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

interface PopoverLabelProps {
  children: React.ReactNode;
}

export function PopoverLabel({ children }: PopoverLabelProps) {
  return <div className="px-4 py-3 font-medium">{children}</div>;
}

interface PopoverTextareaProps {
  className?: string;
  id?: string;
}

export function PopoverTextarea({ className, id }: PopoverTextareaProps) {
  const { note, setNote } = React.useContext(PopoverContext)!;

  return (
    <textarea
      id={id}
      className={cn(
        "h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none",
        className
      )}
      autoFocus
      value={note}
      onChange={(e) => setNote(e.target.value)}
    />
  );
}

interface PopoverFooterProps {
  children: React.ReactNode;
}

export function PopoverFooter({ children }: PopoverFooterProps) {
  return (
    <div className="flex items-center justify-between gap-2 border-t p-3">
      {children}
    </div>
  );
}

export function PopoverCloseButton() {
  const { closePopover } = React.useContext(PopoverContext)!;

  return (
    <Button variant="ghost" size="sm" onClick={closePopover}>
      Cancel
    </Button>
  );
}

interface PopoverSubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost";
}

export function PopoverSubmitButton({
  children,
  variant = "default",
  ...props
}: PopoverSubmitButtonProps) {
  return (
    <Button type="submit" variant={variant} size="sm" {...props}>
      {children}
    </Button>
  );
}

interface PopoverHeaderProps {
  children: React.ReactNode;
}

export function PopoverHeader({ children }: PopoverHeaderProps) {
  return <div className="px-4 py-3">{children}</div>;
}

interface PopoverBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function PopoverBody({ children, className }: PopoverBodyProps) {
  return <div className={cn("px-2 py-1.5", className)}>{children}</div>;
}

interface PopoverButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function PopoverButton({
  children,
  onClick,
  className,
}: PopoverButtonProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-muted",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
