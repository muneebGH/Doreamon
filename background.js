chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === "enabled" && newValue == true) {
      chrome.tabs.query({ url: "https://meet.google.com/*" }, function (tabs) {
        if (tabs) {
          tabs.forEach(function (tab) {
            chrome.tabs.sendMessage(tab.id, { run: true }, function (response) {
              console.log(response);
            });
          });
        }
      });
    }
  }
});
