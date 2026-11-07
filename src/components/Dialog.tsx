import { useEffect, useRef, type ReactNode } from 'react';
import { Close } from './Icons';

type Props = {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
};

/**
 * Native <dialog>: focus moves in on open and back to the opener on close, and
 * Escape closes it, with no code of ours involved.
 */
export default function Dialog({ open, onClose, label, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  // A click that lands on the dialog itself landed on the backdrop.
  useEffect(() => {
    const el = ref.current!;
    const onClick = (e: MouseEvent) => e.target === el && onClose();
    el.addEventListener('click', onClick);
    return () => el.removeEventListener('click', onClick);
  }, [onClose]);

  return (
    <dialog className="dialog" ref={ref} aria-label={label} onClose={onClose}>
      <div className="dialog__body">
        <button className="dialog__close" type="button" aria-label="Close" onClick={onClose}>
          <Close />
        </button>
        {children}
      </div>
    </dialog>
  );
}
