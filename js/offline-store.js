/**
 * SwasthyaSetu Offline-First Local Store & Sync Engine
 * Emulates resilient rural field device synchronization
 */

class OfflineStore {
  constructor() {
    this.isOnline = localStorage.getItem("swasthya_online_status") !== "offline";
    this.pendingSyncQueue = JSON.parse(localStorage.getItem("swasthya_pending_sync") || "[]");
    this.lastSyncedTime = localStorage.getItem("swasthya_last_sync") || "Just now";
    this.syncListeners = [];
  }

  setOnlineStatus(online) {
    this.isOnline = online;
    localStorage.setItem("swasthya_online_status", online ? "online" : "offline");
    this.notifyStatusChange();
  }

  toggleOnlineStatus() {
    this.setOnlineStatus(!this.isOnline);
    return this.isOnline;
  }

  saveRecord(recordType, data) {
    const record = {
      id: "rec_" + Date.now(),
      type: recordType,
      data: data,
      createdAt: new Date().toISOString(),
      synced: this.isOnline
    };

    if (!this.isOnline) {
      this.pendingSyncQueue.push(record);
      localStorage.setItem("swasthya_pending_sync", JSON.stringify(this.pendingSyncQueue));
      this.notifyStatusChange();
      return { success: true, offline: true, message: "Saved locally (Offline Mode)" };
    } else {
      // Synced immediately
      this.lastSyncedTime = "Just now";
      localStorage.setItem("swasthya_last_sync", this.lastSyncedTime);
      this.notifyStatusChange();
      return { success: true, offline: false, message: "Synced with Central Network" };
    }
  }

  triggerSync(callback) {
    if (!this.isOnline) {
      this.isOnline = true;
      localStorage.setItem("swasthya_online_status", "online");
    }

    const headerSyncBtn = document.getElementById("headerSyncBtn");
    const headerSyncText = document.getElementById("headerSyncText");
    if (headerSyncBtn) {
      headerSyncBtn.classList.add("is-syncing");
      if (headerSyncText) headerSyncText.textContent = "Syncing with Cloud...";
    }

    const count = this.pendingSyncQueue.length;
    setTimeout(() => {
      this.pendingSyncQueue = [];
      localStorage.setItem("swasthya_pending_sync", "[]");
      this.lastSyncedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      localStorage.setItem("swasthya_last_sync", this.lastSyncedTime);
      
      if (headerSyncBtn) {
        headerSyncBtn.classList.remove("is-syncing");
      }

      this.notifyStatusChange();
      if (callback) callback(count);
    }, 700);
  }

  onStatusChange(callback) {
    this.syncListeners.push(callback);
    callback({
      isOnline: this.isOnline,
      pendingCount: this.pendingSyncQueue.length,
      lastSyncedTime: this.lastSyncedTime
    });
  }

  notifyStatusChange() {
    const state = {
      isOnline: this.isOnline,
      pendingCount: this.pendingSyncQueue.length,
      lastSyncedTime: this.lastSyncedTime
    };

    this.syncListeners.forEach(cb => cb(state));

    // Update Ribbon
    const offlineRibbon = document.getElementById("offlineRibbon");
    const pendingBadge = document.getElementById("pendingSyncBadge");
    if (offlineRibbon) {
      offlineRibbon.style.display = this.isOnline ? "none" : "flex";
    }
    if (pendingBadge) {
      pendingBadge.textContent = this.pendingSyncQueue.length;
      pendingBadge.style.display = this.pendingSyncQueue.length > 0 ? "inline-block" : "none";
    }

    // Update Segmented Mode Buttons
    const btnOnline = document.getElementById("btnModeOnline");
    const btnOffline = document.getElementById("btnModeOffline");
    if (btnOnline && btnOffline) {
      btnOnline.classList.toggle("is-active", this.isOnline);
      btnOffline.classList.toggle("is-active", !this.isOnline);
    }

    // Update Actionable Header Sync Button
    const headerSyncBtn = document.getElementById("headerSyncBtn");
    const headerSyncText = document.getElementById("headerSyncText");
    const headerPendingBadge = document.getElementById("headerPendingBadge");

    if (headerSyncBtn && headerSyncText) {
      const pendingCount = this.pendingSyncQueue.length;
      
      if (!this.isOnline) {
        headerSyncBtn.className = "btn-sync-action is-offline";
        headerSyncText.textContent = `Offline Mode (${pendingCount} queued)`;
        if (headerPendingBadge) {
          headerPendingBadge.textContent = pendingCount;
          headerPendingBadge.style.display = pendingCount > 0 ? "inline-block" : "none";
        }
      } else if (pendingCount > 0) {
        headerSyncBtn.className = "btn-sync-action has-pending";
        headerSyncText.textContent = `Sync Records`;
        if (headerPendingBadge) {
          headerPendingBadge.textContent = pendingCount;
          headerPendingBadge.style.display = "inline-block";
        }
      } else {
        headerSyncBtn.className = "btn-sync-action is-synced";
        headerSyncText.textContent = `Synced ${this.lastSyncedTime}`;
        if (headerPendingBadge) {
          headerPendingBadge.style.display = "none";
        }
      }
    }
  }
}

window.offlineStore = new OfflineStore();
