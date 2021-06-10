console.log("doraemon started for google meet");

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
