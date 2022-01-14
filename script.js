// const { ocrSpace } = require('ocr-space-api-wrapper');
//common.js import ocrBot.js
// const ocrBot = require("./ocrBot.js");

async function reddenPage() {
  // document.body.style.backgroundColor = "red";
  let input = document.querySelector(".submit-container input");
  console.log(input);
  let base64code = await getCaptchaBase64(input);
  console.log(base64code);
  let code = await getCode(base64code);
  // await fillCapthaInput(code);
  if(!code.ParsedResults[0].ParsedText) return false
  console.log(code.ParsedResults[0].ParsedText);
    await fillCapthaInput(input, code.ParsedResults[0].ParsedText);
    return true
}

async function fillCapthaInput(input,captchaCode) {
  input.focus();
  //simulate typing in the input
  for (let i = 0; i < captchaCode.length; i++) {
    input.value += captchaCode.charAt(i);
    // simulate typing delay
    setTimeout(function () {
      input.dispatchEvent(new Event("input"));
    }, 100);
  }
}

async function getCaptchaBase64() {
  let img = document.querySelector(".submit-container img");
  return new Promise((resolve) => {
    img.onload = () => {
      resolve(img.src);
    };
  });
}

async function getCode(captchaBase64) {
  return await requestCaptcha(captchaBase64);
}

async function requestCaptcha(captchaBase64) {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "400b06478488957");

  var formdata = new FormData();
  formdata.append("language", "eng");
  formdata.append("isOverlayRequired", "false");
  formdata.append("base64Image", captchaBase64);
  formdata.append("iscreatesearchablepdf", "false");
  formdata.append("issearchablepdfhidetextlayer", "false");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return await fetch("https://api.ocr.space/parse/image", requestOptions)
    .then((response) => response.json())
    .catch((error) => runInterval());
}



let isRecaptchaFrame = () => {
    let img = document.querySelector(".submit-container img");
    if (img) {
        document.querySelector('.captcha-img').addEventListener('click', () => {
            console.log('clicked');
            reddenPage();
        });
        
        document.querySelector('.captcha-text').addEventListener('click', () => {
            console.log('clicked');
            reddenPage();
        });
        return true;
    }
    return false;
  };


let runInterval = () => {
    let captchaInterval = setInterval(() => {
        console.log("checking");
        if (isRecaptchaFrame()) {
            clearInterval(captchaInterval)
            reddenPage();
        }  
    }, 500);
};
runInterval()

// event listener for change src .submit-container img src
