// ==============================================================================
// 🛠️ UTILITIES & HELPERS - Sampha Ra POS
// ==============================================================================

/**
 * Format number into Thai Baht currency format
 * @param {number} amount 
 * @returns {string} e.g. "฿1,250.00"
 */
export function formatTHB(amount) {
    const num = Number(amount) || 0;
    return '฿' + num.toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

/**
 * Format Date & Time for display (Thai format)
 * @param {string|Date} dateStr 
 * @returns {string}
 */
export function formatDateTime(dateStr) {
    const date = dateStr ? new Date(dateStr) : new Date();
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Generate unique Order Number e.g. "SPR-20260828-0042"
 */
export function generateOrderNumber() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    return `SPR-${year}${month}${day}-${randomSeq}`;
}

/**
 * Generate EMVCo PromptPay QR Code payload
 * Supports Thai Mobile Number (08xxxxxxxx) or National ID/Tax ID
 * Standard Thai QR Payment Specification
 */
export function generatePromptPayPayload(target = '0812345678', amount = 0) {
    const sanitizedTarget = target.replace(/[^0-9]/g, '');
    let targetFormatted = '';
    let targetTag = '';

    if (sanitizedTarget.length === 10 && sanitizedTarget.startsWith('0')) {
        // Mobile phone number -> convert to +66xxxxxxxxx (e.g. 0066812345678)
        targetFormatted = '0066' + sanitizedTarget.substring(1);
        targetTag = '01'; // Tag 01 for mobile
    } else {
        // Tax ID or 13-digit National ID
        targetFormatted = sanitizedTarget;
        targetTag = '02'; // Tag 02 for National ID / Tax ID
    }

    const targetSubField = `0016A000000677010111${targetTag}${String(targetFormatted.length).padStart(2, '0')}${targetFormatted}`;
    const merchantAccountInfo = `29${String(targetSubField.length).padStart(2, '0')}${targetSubField}`;

    let payload = `000201010212${merchantAccountInfo}5303764`;

    if (amount > 0) {
        const amtStr = Number(amount).toFixed(2);
        payload += `54${String(amtStr.length).padStart(2, '0')}${amtStr}`;
    }

    payload += '5802TH6304';

    // Calculate CRC16 checksum (CCITT-FALSE)
    const crc = crc16(payload);
    return payload + crc;
}

/**
 * CRC16 Calculation for PromptPay EMVCo
 */
function crc16(data) {
    let crc = 0xFFFF;
    for (let i = 0; i < data.length; i++) {
        crc ^= data.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if ((crc & 0x8000) !== 0) {
                crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
            } else {
                crc = (crc << 1) & 0xFFFF;
            }
        }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Web Audio API synthesizer for cashier sound effects (Zero external files needed)
 */
class SoundEffects {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
    }

    // Beep when item is added to cart / scanned
    beep() {
        try {
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        } catch (e) {
            console.debug('Audio not supported or permitted', e);
        }
    }

    // Cash register chime on successful payment
    cashSuccess() {
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            
            // Note 1 (E6)
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();
            osc1.frequency.setValueAtTime(1318.51, now);
            gain1.gain.setValueAtTime(0.15, now);
            gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            osc1.connect(gain1);
            gain1.connect(this.ctx.destination);
            osc1.start(now);
            osc1.stop(now + 0.25);

            // Note 2 (B6)
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.frequency.setValueAtTime(1975.53, now + 0.1);
            gain2.gain.setValueAtTime(0.18, now + 0.1);
            gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            osc2.connect(gain2);
            gain2.connect(this.ctx.destination);
            osc2.start(now + 0.1);
            osc2.stop(now + 0.5);
        } catch (e) {
            console.debug('Audio error', e);
        }
    }
}

export const sounds = new SoundEffects();

/**
 * Toast Notification System
 */
export function showToast(message, type = 'info', title = '') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;

    let icon = '🔔';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
            ${title ? `<div class="toast-title">${title}</div>` : ''}
            <div class="toast-msg">${message}</div>
        </div>
        <button class="toast-close" aria-label="Close">&times;</button>
    `;

    container.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    });

    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }
    }, 3800);
}

/**
 * Trigger Confetti celebration effect
 */
export function launchConfetti() {
    if (window.confetti) {
        window.confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#B87333', '#D4AF37', '#1A1A1A', '#E8D8C8', '#4A6B53']
        });
    }
}
