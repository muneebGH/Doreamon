chrome.storage.local.get(["enabled"], function (result) {
  if (result) {
    document.getElementById("enable-toggle-muneeb").checked = result.enabled;
  } else {
    document.getElementById("enable-toggle-muneeb").checked = false;
  }
});

document
  .getElementById("enable-toggle-muneeb")
  .addEventListener("click", function (e) {
    chrome.storage.local.set({ enabled: e.target.checked }, function () {
      console.log("Value is set to " + e.target.checked);
    });
  });
