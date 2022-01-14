// const { ocrSpace } = require('ocr-space-api-wrapper');
//common.js import ocrBot.js
// const ocrBot = require("./ocrBot.js");

async function solveCaptcha() {
  // document.body.style.backgroundColor = "red";
  let input = document.querySelector(".submit-container input");
  console.log(input);
  let base64code = await getCaptchaBase64(input);
  console.log(base64code);
  let code = await getCode(base64code);
  // await fillCapthaInput(code);
  if (!code.ParsedResults[0].ParsedText) return false;
  console.log(code.ParsedResults[0].ParsedText);
  await fillCapthaInput(input, code.ParsedResults[0].ParsedText);
  return true;
}

async function fillCapthaInput(input, captchaCode) {
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
    .catch((error) => false);
}

let isCaptchaFrame = () => {
  let img = document.querySelector(".submit-container img");
  if (img) {
    return true;
  }
  return false;
};

let isTermsCheckBox = () => {
  let checkbox = document.querySelector("#agreement");
  if (checkbox) {
    return true;
  }
  return false;
};

var currentURL = location.href;
setInterval(function () {
  if (location.href != currentURL) {
    console.log("url changed");
    if (isCaptchaFrame()) {
      // clearInterval(captchaInterval);
      solveCaptcha();

        document.querySelector('.captcha-img').addEventListener('click', () => {
          solveCaptcha();
        });

        document.querySelector('.captcha-text').addEventListener('click', () => {
          solveCaptcha();
        });
      let captchaImage = document.querySelector(".submit-container img");
      observer = new MutationObserver((changes) => {
        changes.forEach(change => {
          if (change.attributeName.includes('src')) {
            // console.dir(captchaImage.src);
            solveCaptcha();
          }
        });
      });
      observer.observe(captchaImage, { attributes: true });
    }
    if (isTermsCheckBox()) {
      // clearInterval(captchaInterval);
      document.querySelector('#agreement').click();
    }
    currentURL = location.href
  }
}, 100);



// let runInterval = () => {
//   let captchaInterval = setInterval(() => {
//     console.log("checking");
//     if (isCaptchaFrame()) {
//       clearInterval(captchaInterval);
//       solveCaptcha();

//       document.querySelector('.captcha-img').addEventListener('click', () => {
//         solveCaptcha();
//       });

//       document.querySelector('.captcha-text').addEventListener('click', () => {
//         solveCaptcha();
//       });
//     }
//     if (isTermsCheckBox()) {
//       clearInterval(captchaInterval);
//       document.querySelector('#agreement').click();
//     }
//   }, 500);
// };

// runInterval();

// event listener for change src .submit-container img src
