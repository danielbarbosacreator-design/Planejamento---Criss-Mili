import React from 'react';

export default function TopBar({ currentUser, onMobileMenu }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        {onMobileMenu && (
          <button className="mobile-menu-btn" onClick={onMobileMenu} aria-label="Menu">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}
        <div className="topbar-search">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="topbar-right">
        <button className="icon-btn-clean notification-btn">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          <span className="notification-dot"></span>
        </button>
        <div className="topbar-profile">
          <div className="topbar-avatar">{currentUser?.name?.charAt(0) || "U"}</div>
          <span className="topbar-name">{currentUser?.name?.split(" ")[0] || "User"}</span>
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </div>
    </div>
  );
}
