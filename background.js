chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
      function: () => {
        document.querySelector(".submit-container img").addEventListener("load", async () => {
            console.log("change src");
          solveCaptcha();
        });
    },
  });
});