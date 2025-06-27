// app/components/Dialog.tsx
"use client";
import { Fragment, ReactNode } from "react";
import { Dialog as HDialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Dialog({ open, onClose, title, children }: Props) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <HDialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        {/* Dialog content */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <HDialog.Panel className="relative w-full max-w-md sm:max-w-lg rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-6">
              {/* Botón Cerrar */}
              <button
                type="button"
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 transition"
                onClick={onClose}
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
              {/* Título (opcional) */}
              {title && (
                <HDialog.Title as="h3" className="text-lg font-semibold mb-4 text-gray-800">
                  {title}
                </HDialog.Title>
              )}
              {children}
            </HDialog.Panel>
          </Transition.Child>
        </div>
      </HDialog>
    </Transition.Root>
  );
}