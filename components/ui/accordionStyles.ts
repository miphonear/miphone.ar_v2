// components/ui/accordionStyles.ts
export const ACCORDION_WRAPPER_CLASS = (isOpen: boolean) =>
  `rounded-2xl shadow-sm transition ${
    isOpen ? 'ring-2 ring-orange-500 bg-orange-50/50' : 'ring-2 ring-gray-200 bg-white/80'
  }`

export const ACCORDION_HEADER_CLASS = (isOpen: boolean) =>
  `flex w-full justify-between items-center px-6 py-3 text-left text-base font-bold tracking-wide
   group transition-colors duration-300 hover:text-orange-500
   focus:outline-none focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-orange-500
   ${isOpen ? 'text-orange-500' : 'text-gray-800'}`

export const ACCORDION_PANEL_CLASS = 'px-6 pt-1 pb-6 overflow-hidden'
