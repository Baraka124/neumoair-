// icons.js - Icon definitions for Spirolite
(function() {
  'use strict';
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIcons);
  } else {
    initIcons();
  }
  
  function initIcons() {
    // Create style element for icon definitions
    const style = document.createElement('style');
    style.id = 'spirolite-icons';
    style.textContent = `
      /* Icon definitions using CSS content */
      .icon-language::before { content: "🌐"; }
      .icon-settings::before { content: "⚙️"; }
      .icon-export::before { content: "📤"; }
      .icon-new-patient::before { content: "👤➕"; }
      .icon-patients::before { content: "👥"; }
      .icon-quick::before { content: "⚡"; }
      .icon-monitor::before { content: "📊"; }
      .icon-full::before { content: "📋"; }
      .icon-review::before { content: "👁️"; }
      .icon-compare::before { content: "↔️"; }
      .icon-protocol::before { content: "📜"; }
      .icon-clear::before { content: "🗑️"; }
      .icon-save::before { content: "💾"; }
      .icon-copy::before { content: "📋"; }
      .icon-single::before { content: "1️⃣"; }
      .icon-bulk::before { content: "📦"; }
      .icon-spreadsheet::before { content: "📈"; }
      .icon-add::before { content: "➕"; }
      .icon-import::before { content: "📥"; }
      .icon-calculate::before { content: "🧮"; }
      .icon-percent::before { content: "%"; }
      .icon-liters::before { content: "L"; }
      .icon-pdf::before { content: "📄"; }
      .icon-chart::before { content: "📈"; }
      .icon-chart-hide::before { content: "📉"; }
      .icon-new-analysis::before { content: "🔄"; }
      .icon-close::before { content: "✕"; }
      .icon-reset::before { content: "↺"; }
      .icon-create::before { content: "✅"; }
      .icon-cancel::before { content: "❌"; }
      .icon-stable::before { content: "✅"; }
      .icon-monitoring::before { content: "⚠️"; }
      .icon-warning::before { content: "⚠️"; }
      .icon-accept::before { content: "✓"; }
      .icon-replace::before { content: "🔄"; }
      .icon-notes::before { content: "📝"; }
      .icon-notes-small::before { content: "📝"; }
      .icon-success::before { content: "✅"; }
      .icon-error::before { content: "❌"; }
      .icon-info::before { content: "ℹ️"; }
      .icon-no-data::before { content: "📭"; }
      .icon-no-patients::before { content: "👤❌"; }
      .icon-id::before { content: "🆔"; }
      .icon-calendar::before { content: "📅"; }
      .icon-baseline::before { content: "📏"; }
      .icon-visits::before { content: "📋"; }
      .icon-baseline-ready::before { content: "✅"; }
      
      /* Icon styling */
      [class^="icon-"]::before,
      [class*=" icon-"]::before {
        display: inline-block;
        font-style: normal;
        font-weight: normal;
        line-height: 1;
        vertical-align: -0.125em;
        speak: never;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Navigation icons */
      .nav-icon::before {
        font-size: 1.25rem;
        margin-bottom: 4px;
      }
      
      /* Header button icons */
      .header-btn [class^="icon-"]::before,
      .header-btn [class*=" icon-"]::before {
        margin-right: 0;
        font-size: 1rem;
      }
      
      /* Action button icons */
      .action-btn [class^="icon-"]::before,
      .action-btn [class*=" icon-"]::before {
        margin-right: 6px;
        font-size: 0.9rem;
      }
      
      /* Toast icons */
      .toast .icon-success::before { content: "✅"; }
      .toast .icon-error::before { content: "❌"; }
      .toast .icon-warning::before { content: "⚠️"; }
      .toast .icon-info::before { content: "ℹ️"; }
      
      /* Empty state icons */
      .empty-state-icon::before {
        font-size: 3rem;
        opacity: 0.3;
        display: block;
        margin-bottom: 1rem;
      }
      
      /* Trend arrows */
      .trend-arrow.up::before { content: "↗"; }
      .trend-arrow.down::before { content: "↘"; }
      .trend-arrow.neutral::before { content: "→"; }
      
      /* Hide empty icon elements */
      [class^="icon-"]:empty,
      [class*=" icon-"]:empty {
        display: none;
      }
    `;
    
    document.head.appendChild(style);
    console.log('Spirolite icons loaded');
  }
  
  // Export for module systems if needed
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initIcons };
  }
})();
