(async () => {
  const LAST_GRAYSCALE_KEY = "DEV_LAST_GRAYSCALE_KEY";

  const lastGrayscaleKey = localStorage.getItem(LAST_GRAYSCALE_KEY);

  const key = prompt("Please enter grayscale key", lastGrayscaleKey || "");
  // cancel or blank, do nothing
  if (!key) {
    console.log("cancelled grayscale set");
    return;
  }

  const value = prompt(
    `Please enter value for "${key}" (put empty value to delete)`
  );

  // cancel do nothing
  if (value === null) {
    console.log("cancelled grayscale set");
    return;
  }

  // save last grayscale key
  localStorage.setItem(LAST_GRAYSCALE_KEY, key);

  function dynamicallyLoadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject();
      };
      document.head.appendChild(script);
    });
  }

  if (typeof CryptoJS === "undefined") {
    // await dynamicallyLoadScript('https://bookmarklet.com/lib/crypto-js.min.js')
    await dynamicallyLoadScript(
      "http://127.0.0.1:5500/bookmarklet/lib/crypto-js.min.js"
    );
  }

  const AMCS_STORE_SALT = "AMCS_STORE_SALT";

  const bytes = CryptoJS.AES.decrypt(
    localStorage.getItem("AMCS_STORE"),
    AMCS_STORE_SALT
  );

  let amcsStore = JSON.parse(CryptoJS.enc.Utf8.stringify(bytes));

  if (value.length === 0) {
    // delete when insert blank value
    Object.keys(amcsStore).forEach((profile) => {
      delete amcsStore[profile].grayscales[key];
    });
  } else {
    // set value
    Object.keys(amcsStore).forEach((profile) => {
      amcsStore[profile].grayscales[key] = { version: "0", value };
    });
  }

  // save back to localStorage
  localStorage.setItem(
    "AMCS_STORE",
    CryptoJS.AES.encrypt(JSON.stringify(amcsStore), AMCS_STORE_SALT).toString()
  );
})();
