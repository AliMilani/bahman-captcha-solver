// // const { ocrSpace } = require('ocr-space-api-wrapper');
// //common.js import ocrBot.js
// // const ocrBot = require("./ocrBot.js");

// async function reddenPage() {
//   // document.body.style.backgroundColor = "red";
//   let input = document.querySelector(".submit-container input");
//   console.log(input);
//   let base64code = await getCaptchaBase64(input);
//   console.log(base64code);
//   let code = await getCode(base64code);
//   // await fillCapthaInput(code);
//   console.log(code);
// }

// fillCapthaInput = async function (captchaCode='1234') { 
//   input.focus();
//   //simulate typing in the input
//   for (let i = 0; i < captchaCode.length; i++) {
//     input.value += captchaCode.charAt(i);
//     // simulate typing delay
//     setTimeout(function () {
//       input.dispatchEvent(new Event("input"));
//     }, 100);
//   }
// }

// async function getCaptchaBase64(captchaSelector) {
//   return new Promise((resolve) => {
//     captchaSelector.onload = () => {
//       resolve(captchaSelector.src);
//     };
//   });
// }

// async function getCode(captchaBase64) {
//   return await requestCaptcha(captchaBase64)
// }

// async function requestCaptcha(captchaBase64) {
//   var myHeaders = new Headers();
//   myHeaders.append("apikey", "400b06478488957");
  
//   var formdata = new FormData();
//   formdata.append("language", "eng");
//   formdata.append("isOverlayRequired", "false");
//   formdata.append("base64Image", captchaBase64);
//   formdata.append("iscreatesearchablepdf", "false");
//   formdata.append("issearchablepdfhidetextlayer", "false");
  
//   var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: formdata,
//     redirect: 'follow'
//   };
  
//   return await fetch("https://api.ocr.space/parse/image", requestOptions)
//     .then(response => response.json())
//     .catch(error => console.log('error', error));
// }
  

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
      function: () => {
        document.querySelector(".submit-container img").addEventListener("load", async () => {
            console.log("change src");
            runInterval();
        });
    },
  });
});

// // chrome extension on page load event executes this function

// //add this script to page dom and run the function
// // chrome.scripting.executeScript({
// //   target: { tabId: tab.id },
// //   function: reddenPage,
// // });