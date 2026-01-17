function extractDeals() {
  const rows = document.querySelectorAll("lyte-tr");

  const deals = [];

  rows.forEach((row) => {
    const cells = row.querySelectorAll("lyte-td");
    if (cells.length < 4) return;

    const name = cells[0]?.innerText?.trim();
    const stage = cells[2]?.innerText?.trim();
    const amount = cells[1]?.innerText?.trim();
    const pipeline = document.querySelector('[data-zcqa="pipelineName"]')?.innerText || "Default";

    if (name) {
      deals.push({
        id: name + stage,
        name,
        stage,
        amount,
        pipeline
      });
    }
  });

  if (deals.length) {
    chrome.runtime.sendMessage({
      type: "SAVE_DEALS",
      payload: deals
    });
    showStatus("Deals extracted");
  } else {
    showStatus("No deals found");
  }
}

function showStatus(text) {
  const host = document.createElement("div");
  const shadow = host.attachShadow({ mode: "open" });

  shadow.innerHTML = `
    <div style="
      position:fixed;
      top:20px;
      right:20px;
      background:#000;
      color:#fff;
      padding:8px 12px;
      z-index:999999;
      border-radius:6px;
      font-size:12px;
    ">
      ${text}
    </div>
  `;

  document.body.appendChild(host);
  setTimeout(() => host.remove(), 3000);
}

window.addEventListener("keydown", (e) => {
  if (e.altKey && e.key === "E") {
    extractDeals();
  }
});
