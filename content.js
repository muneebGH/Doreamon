console.log("doraemon script injected for this page");
function isOfflinePage() {
  let offlineText = Array.prototype.filter.call(
    document.querySelectorAll("h2"),
    (e) => e.textContent.toLowerCase().replaceAll(" ", "") === "youareoffline"
  );
  if (offlineText.length > 0) {
    let goOnlineText = Array.prototype.filter.call(
      document.querySelectorAll("span"),
      (e) =>
        e.textContent
          .toLowerCase()
          .replaceAll(" ", "")
          .includes("gobackonlinetousegooglemeet")
    );
    return offlineText.length > 0 && goOnlineText.length > 0 ? true : false;
  } else {
    return false;
  }
}

if (isOfflinePage()) {
  chrome.storage.local.get(["enabled"], function (result) {
    if (result && result.enabled) {
      console.log("offline page: registering reload with 7 seconds wait");
      setTimeout(() => window.location.reload(), 7000);
    }
  });
}

function getJoinClickableWith(text) {
  let speez = Array.prototype.filter.call(
    document.querySelectorAll("span"),
    (e) => e.textContent.toLowerCase().replaceAll(" ", "") === text
  );
  if (speez.length > 0) {
    return speez[0];
  }
  return false;
}
function meetingJoiner() {
  let currentJoinOption =
    getJoinClickableWith("asktojoin") ||
    getJoinClickableWith("joinnow") ||
    getJoinClickableWith("rejoin");
  //meet is being recorded prompt is pending

  if (currentJoinOption) {
    chrome.storage.local.get(["enabled"], function (result) {
      if (result && result.enabled) {
        currentJoinOption.click();
      }
    });
  }
}
document.addEventListener("DOMSubtreeModified", function (event) {
  meetingJoiner();
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.run == true) {
    meetingJoiner();
    sendResponse({ done: "yes" });
  }
});
