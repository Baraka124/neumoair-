// icons.js - Advanced SVG Icon System for Spirolite
class SpiroliteIconSystem {
    constructor() {
        this.icons = new Map();
        this.init();
        this.injectStyles();
    }
    
    init() {
        // Navigation & Mode Icons
        this.icons.set('quick', this.createQuickIcon());
        this.icons.set('monitor', this.createMonitorIcon());
        this.icons.set('full', this.createFullIcon());
        this.icons.set('review', this.createReviewIcon());
        
        // Action & Button Icons
        this.icons.set('settings', this.createSettingsIcon());
        this.icons.set('export', this.createExportIcon());
        this.icons.set('clear', this.createClearIcon());
        this.icons.set('save', this.createSaveIcon());
        this.icons.set('copy', this.createCopyIcon());
        this.icons.set('add', this.createAddIcon());
        this.icons.set('import', this.createImportIcon());
        this.icons.set('pdf', this.createPDFIcon());
        this.icons.set('chart', this.createChartIcon());
        this.icons.set('new-analysis', this.createNewAnalysisIcon());
        this.icons.set('cancel', this.createCancelIcon());
        this.icons.set('create', this.createCreateIcon());
        this.icons.set('reset', this.createResetIcon());
        this.icons.set('accept', this.createAcceptIcon());
        this.icons.set('replace', this.createReplaceIcon());
        
        // Status & Indicator Icons
        this.icons.set('stable', this.createStableIcon());
        this.icons.set('monitoring', this.createMonitoringIcon());
        this.icons.set('baseline-ready', this.createBaselineReadyIcon());
        this.icons.set('warning', this.createWarningIcon());
        this.icons.set('success', this.createSuccessIcon());
        this.icons.set('error', this.createErrorIcon());
        this.icons.set('info', this.createInfoIcon());
        
        // Patient & Context Icons
        this.icons.set('new-patient', this.createNewPatientIcon());
        this.icons.set('patients', this.createPatientsIcon());
        this.icons.set('id', this.createIdIcon());
        this.icons.set('calendar', this.createCalendarIcon());
        this.icons.set('baseline', this.createBaselineIcon());
        this.icons.set('visits', this.createVisitsIcon());
        
        // Measurement & Analysis Icons
        this.icons.set('compare', this.createCompareIcon());
        this.icons.set('protocol', this.createProtocolIcon());
        this.icons.set('calculate', this.createCalculateIcon());
        this.icons.set('percent', this.createPercentIcon());
        this.icons.set('liters', this.createLitersIcon());
        this.icons.set('notes', this.createNotesIcon());
        this.icons.set('notes-small', this.createNotesSmallIcon());
        
        // Chart & Visualization Icons
        this.icons.set('chart-hide', this.createChartHideIcon());
        
        // Empty States
        this.icons.set('no-data', this.createNoDataIcon());
        this.icons.set('no-patients', this.createNoPatientsIcon());
        
        // Close & Navigation
        this.icons.set('close', this.createCloseIcon());
    }
    
    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .icon {
                display: inline-block;
                width: 1em;
                height: 1em;
                vertical-align: middle;
                fill: currentColor;
                stroke: currentColor;
                stroke-width: 0;
            }
            
            .icon-spin {
                animation: icon-spin 2s infinite linear;
            }
            
            @keyframes icon-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .icon-pulse {
                animation: icon-pulse 2s infinite;
            }
            
            @keyframes icon-pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            .icon-success { color: var(--success); }
            .icon-warning { color: var(--warning); }
            .icon-error { color: var(--alert); }
            .icon-info { color: var(--info); }
            
            .nav-icon .icon {
                width: 1.125em;
                height: 1.125em;
                margin-bottom: 2px;
            }
            
            .header-btn .icon {
                width: 1.25em;
                height: 1.25em;
            }
            
            .action-btn .icon {
                width: 1em;
                height: 1em;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Icon Creation Methods
    createQuickIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M13.5 2L3 13.5v8h8L22 10.5V2h-8.5zM7 19H5v-2h2v2zm12-12l-8 8H9l8-8h2z"/>
            <circle cx="18" cy="6" r="1.5"/>
        </svg>`;
    }
    
    createMonitorIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v2h10v-2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
            <path d="M8 15l4-6 4 6H8z"/>
        </svg>`;
    }
    
    createFullIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
            <path d="M7 12h10v2H7zm0-4h10v2H7zm0 8h7v2H7z"/>
        </svg>`;
    }
    
    createReviewIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h10v2H7zm0 4h7v2H7z"/>
            <circle cx="17" cy="8" r="1.5"/>
        </svg>`;
    }
    
    createSettingsIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.33-.02-.64-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.44.17-.48.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.3-.06.61-.06.94 0 .33.02.64.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.04.24.24.41.48.41h3.84c.24 0 .44-.17.48-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
        </svg>`;
    }
    
    createExportIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>`;
    }
    
    createClearIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>`;
    }
    
    createSaveIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
        </svg>`;
    }
    
    createCopyIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
        </svg>`;
    }
    
    createAddIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>`;
    }
    
    createImportIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>`;
    }
    
    createPDFIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/>
        </svg>`;
    }
    
    createChartIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
            <path d="M21 3H3v18h18V3zM19 19H5V5h14v14z"/>
        </svg>`;
    }
    
    createChartHideIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
            <path d="M21 3H3v18h18V3zM19 19H5V5h14v14z"/>
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
        </svg>`;
    }
    
    createNewAnalysisIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
            <path d="M11 7h2v4h4v2h-4v4h-2v-4H7v-2h4z"/>
        </svg>`;
    }
    
    createStableIcon() {
        return `<svg class="icon icon-success icon-pulse" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>`;
    }
    
    createMonitoringIcon() {
        return `<svg class="icon icon-warning" viewBox="0 0 24 24">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </svg>`;
    }
    
    createBaselineReadyIcon() {
        return `<svg class="icon icon-info icon-pulse" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>`;
    }
    
    createSuccessIcon() {
        return `<svg class="icon icon-success" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>`;
    }
    
    createErrorIcon() {
        return `<svg class="icon icon-error" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>`;
    }
    
    createWarningIcon() {
        return `<svg class="icon icon-warning" viewBox="0 0 24 24">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </svg>`;
    }
    
    createInfoIcon() {
        return `<svg class="icon icon-info" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>`;
    }
    
    createNewPatientIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>`;
    }
    
    createPatientsIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>`;
    }
    
    createCloseIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>`;
    }
    
    createCancelIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>`;
    }
    
    createCreateIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
        </svg>`;
    }
    
    createResetIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
        </svg>`;
    }
    
    createAcceptIcon() {
        return `<svg class="icon icon-success" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>`;
    }
    
    createReplaceIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M21 6h-7.59l3.29-3.29L16 2l-4 4 4 4 1.29-1.29L13.41 8H21v6h-2v-4zm-9 8H3v-6h2v4h7.59l-3.29 3.29L8 18l4-4-4-4-1.29 1.29L10.59 10H3V4h2v6h9v6z"/>
        </svg>`;
    }
    
    createIdIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M10 20H5v2h5v2l3-3-3-3v2zm4 0v2h5v-2h-5zM12 8c1.1 0 2-.9 2-2s-.9-2-2-2-1.99.9-1.99 2S10.9 8 12 8zm5-8H7C5.9 0 5 .9 5 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM7 2h10v10.5c0 1.67-3.33 2.5-5 2.5s-5-.83-5-2.5V2z"/>
        </svg>`;
    }
    
    createCalendarIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
        </svg>`;
    }
    
    createBaselineIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>`;
    }
    
    createVisitsIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>`;
    }
    
    createCompareIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v2h2V1h-2v2zm0 15H5l5-6v6zm9-15h-5v2h5v13l-5-6v9h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
        </svg>`;
    }
    
    createProtocolIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
        </svg>`;
    }
    
    createCalculateIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5.97 4.06L14.09 6l1.41 1.41L16.91 6l1.06 1.06-1.41 1.41 1.41 1.41-1.06 1.06-1.41-1.41-1.41 1.41-1.06-1.06 1.41-1.41-1.41-1.41zm-6.78.36h2v3h3v2h-3v3h-2v-3H5v-2h3v-3zM7.5 18h9v-2h-9v2z"/>
        </svg>`;
    }
    
    createPercentIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M7.5 4C5.57 4 4 5.57 4 7.5S5.57 11 7.5 11 11 9.43 11 7.5 9.43 4 7.5 4zm0 5C6.67 9 6 8.33 6 7.5S6.67 6 7.5 6 9 6.67 9 7.5 8.33 9 7.5 9zm9 4c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5.41 20L4 18.59 18.59 4 20 5.41 5.41 20z"/>
        </svg>`;
    }
    
    createLitersIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M16 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8l-5-5zM7 7h5v2H7V7zm10 10H7v-2h10v2zm0-4H7v-2h10v2zm-2-4V5l4 4h-4z"/>
        </svg>`;
    }
    
    createNotesIcon() {
        return `<svg class="icon" viewBox="0 0 24 24">
            <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-9-4h8v2H9zm0-3h8v2H9zm0-3h8v2H9z"/>
        </svg>`;
    }
    
    createNotesSmallIcon() {
        return `<svg class="icon" viewBox="0 0 16 16">
            <path d="M2 2v12h12V2H2zm2 2h8v2H4V4zm0 3h8v2H4V7zm0 3h5v2H4v-2z"/>
        </svg>`;
    }
    
    createNoDataIcon() {
        return `<svg class="icon" viewBox="0 0 24 24" fill="currentColor" opacity="0.3">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>`;
    }
    
    createNoPatientsIcon() {
        return `<svg class="icon" viewBox="0 0 24 24" fill="currentColor" opacity="0.3">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>`;
    }
    
    get(iconName) {
        return this.icons.get(iconName) || '';
    }
    
    injectAllIcons() {
        // Replace all icon placeholders with actual SVG
        document.querySelectorAll('[class*="icon-"]').forEach(element => {
            const classes = element.className.split(' ');
            const iconClass = classes.find(cls => cls.startsWith('icon-'));
            if (iconClass) {
                const iconName = iconClass.replace('icon-', '');
                const iconSvg = this.get(iconName);
                if (iconSvg) {
                    element.innerHTML = iconSvg;
                }
            }
        });
    }
}

// Initialize and export
const iconSystem = new SpiroliteIconSystem();
window.SpiroliteIcons = iconSystem;

// Auto-inject on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        iconSystem.injectAllIcons();
    });
} else {
    iconSystem.injectAllIcons();
}
