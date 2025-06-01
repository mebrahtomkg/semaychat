import React from 'react';

export interface MenuItemDescriptor {
  icon: React.ReactNode;
  label: string;
  action: () => void;
}

export interface ContextMenuControlProps {
  menuRef: React.RefObject<HTMLUListElement | null>;
  menuStyles: React.CSSProperties;
  closeMenu: () => void;
}
