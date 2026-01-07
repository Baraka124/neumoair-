// Update Manager for Spirolite PWA
class UpdateManager {
    constructor() {
        this.updateAvailable = false;
        this.registration = null;
        this.updateToast = null;
        
        this.init();
    }
    
    init() {
        // Listen for controller change (SW update)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('Controller changed - reloading for update');
            this.showReloadNotification();
        });
        
        // Check for updates periodically
        setInterval(() => this.checkForUpdates(), 60 * 60 * 1000); // Every hour
    }
    
    async checkForUpdates() {
        if (!this.registration) {
            this.registration = await navigator.serviceWorker.getRegistration();
        }
        
        try {
            await this.registration.update();
            console.log('Update check completed');
        } catch (error) {
            console.error('Update check failed:', error);
        }
    }
    
    showUpdateAvailable(registration) {
        if (this.updateAvailable) return;
        
        this.updateAvailable = true;
        this.registration = registration;
        
        // Create update notification
        this.updateToast = this.createUpdateToast();
        document.body.appendChild(this.updateToast);
        
        // Auto-hide after 30 seconds
        setTimeout(() => {
            if (this.updateToast && this.updateToast.parentNode) {
                this.updateToast.style.opacity = '0';
                setTimeout(() => {
                    if (this.updateToast && this.updateToast.parentNode) {
                        this.updateToast.parentNode.removeChild(this.updateToast);
                    }
                }, 300);
            }
        }, 30000);
    }
    
    createUpdateToast() {
        const toast = document.createElement('div');
        toast.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #1A5F7A, #2D9596);
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                z-index: 10000;
                max-width: 350px;
                animation: slideInUp 0.3s ease;
            ">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                    <span style="font-size: 20px;">🔄</span>
                    <strong style="flex: 1;">Update Available</strong>
                    <button id="closeUpdateToast" style="
                        background: none;
                        border: none;
                        color: white;
                        font-size: 18px;
                        cursor: pointer;
                        opacity: 0.7;
                    ">×</button>
                </div>
                <p style="margin: 0 0 12px 0; font-size: 14px; opacity: 0.9;">
                    A new version of Spirolite is ready. Reload to get the latest features.
                </p>
                <div style="display: flex; gap: 8px;">
                    <button id="reloadForUpdate" style="
                        flex: 1;
                        background: white;
                        color: #1A5F7A;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 6px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                    ">Reload Now</button>
                    <button id="laterUpdate" style="
                        background: rgba(255,255,255,0.2);
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.2s;
                    ">Later</button>
                </div>
            </div>
        `;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInUp {
                from { transform: translateY(100px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Add event listeners
        setTimeout(() => {
            toast.querySelector('#reloadForUpdate').addEventListener('click', () => {
                this.applyUpdate();
            });
            
            toast.querySelector('#laterUpdate').addEventListener('click', () => {
                this.hideUpdateToast();
            });
            
            toast.querySelector('#closeUpdateToast').addEventListener('click', () => {
                this.hideUpdateToast();
            });
        }, 100);
        
        return toast;
    }
    
    hideUpdateToast() {
        if (this.updateToast && this.updateToast.parentNode) {
            this.updateToast.style.opacity = '0';
            this.updateToast.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (this.updateToast && this.updateToast.parentNode) {
                    this.updateToast.parentNode.removeChild(this.updateToast);
                }
            }, 300);
        }
    }
    
    showReloadNotification() {
        const reloadToast = document.createElement('div');
        reloadToast.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #059669;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            ">
                <span style="margin-right: 8px;">✅</span>
                Update applied! Page will reload in <span id="countdown">5</span> seconds...
                <button onclick="location.reload()" style="
                    margin-left: 12px;
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                ">Reload Now</button>
            </div>
        `;
        
        document.body.appendChild(reloadToast);
        
        // Countdown and auto-reload
        let countdown = 5;
        const countdownEl = reloadToast.querySelector('#countdown');
        const interval = setInterval(() => {
            countdown--;
            countdownEl.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(interval);
                location.reload();
            }
        }, 1000);
    }
    
    async applyUpdate() {
        if (!this.registration || !this.registration.waiting) {
            console.log('No update waiting');
            return;
        }
        
        // Post skip waiting message to SW
        this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        
        // Hide update toast
        this.hideUpdateToast();
        
        // Show applying update message
        this.showApplyingUpdate();
    }
    
    showApplyingUpdate() {
        const applyingToast = document.createElement('div');
        applyingToast.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(26, 95, 122, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
                color: white;
                text-align: center;
            ">
                <div>
                    <div style="font-size: 48px; margin-bottom: 20px;">🔄</div>
                    <h2 style="margin-bottom: 10px;">Applying Update</h2>
                    <p>Please wait while we update to the latest version...</p>
                    <div style="margin-top: 30px; width: 200px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px; overflow: hidden;">
                        <div id="progressBar" style="height: 100%; background: #57C5B6; width: 0%; transition: width 2s ease;"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(applyingToast);
        
        // Animate progress bar
        setTimeout(() => {
            const progressBar = applyingToast.querySelector('#progressBar');
            if (progressBar) {
                progressBar.style.width = '100%';
            }
        }, 100);
        
        // Auto-remove after 3 seconds (should be reloaded by then)
        setTimeout(() => {
            if (applyingToast.parentNode) {
                applyingToast.parentNode.removeChild(applyingToast);
            }
        }, 3000);
    }
}

// Initialize when Service Worker is ready
if ('serviceWorker' in navigator) {
    window.updateManager = new UpdateManager();
}

// Export for manual control
window.UpdateManager = UpdateManager;
