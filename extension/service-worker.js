chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "SAVE_DEALS") {
    chrome.storage.local.get(["zoho_data"], (res) => {
      const data = res.zoho_data || { deals: [], lastSync: null };

      const existingIds = new Set(data.deals.map(d => d.id));
      msg.payload.forEach(deal => {
        if (!existingIds.has(deal.id)) {
          data.deals.push(deal);
        }
      });

      data.lastSync = Date.now();

      chrome.storage.local.set({ zoho_data: data }, () => {
        sendResponse({ success: true });
      });
    });
    return true;
  }
});
