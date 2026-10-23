'use client';

// The App Router preserves the shared header across client navigation, including
// native <details> state. Close only after a navigation link is selected; keep
// summary keyboard behaviour and the no-JavaScript full-page fallback native.
export default function MobileMenu({ children }) {
  return (
    <details className="menu" onClick={(event) => {
      if (event.target.closest('a[href]')) event.currentTarget.open = false;
    }} onKeyDown={(event) => {
      if (event.key === 'Escape' && event.currentTarget.open) {
        event.currentTarget.open = false;
        event.currentTarget.querySelector('summary')?.focus();
      }
    }}>
      <summary>Menu</summary>
      {children}
    </details>
  );
}
