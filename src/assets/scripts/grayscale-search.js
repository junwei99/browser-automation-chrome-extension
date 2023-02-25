(async () => {
  const LAST_SEARCH_GRAYSCALE_KEY = "DEV_LAST_SEARCH_GRAYSCALE_KEY";
  // const cryptoJSUrl = "https://bookmarklet.com/lib/crypto-js.min.js";
  const cryptoJSUrl = "http://127.0.0.1:5500/bookmarklet/lib/crypto-js.min.js";

  const lastSearchGrayscaleKey = localStorage.getItem(
    LAST_SEARCH_GRAYSCALE_KEY
  );

  const amcsKey = prompt(
    "grayscale key to search",
    lastSearchGrayscaleKey || ""
  );

  if (!amcsKey) {
    alert("No AMCS key input");
    return;
  }

  localStorage.setItem(LAST_SEARCH_GRAYSCALE_KEY, amcsKey);

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
    await dynamicallyLoadScript(cryptoJSUrl);
    (async () => {
      const LAST_SEARCH_GRAYSCALE_KEY = "DEV_LAST_SEARCH_GRAYSCALE_KEY";

      const lastSearchGrayscaleKey = localStorage.getItem(
        LAST_SEARCH_GRAYSCALE_KEY
      );

      const amcsKey = prompt(
        "grayscale key to search",
        lastSearchGrayscaleKey || ""
      );

      if (!amcsKey) {
        alert("No AMCS key input");
        return;
      }

      localStorage.setItem(LAST_SEARCH_GRAYSCALE_KEY, amcsKey);

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
        (async () => {
          const LAST_SEARCH_GRAYSCALE_KEY = "DEV_LAST_SEARCH_GRAYSCALE_KEY";

          const lastSearchGrayscaleKey = localStorage.getItem(
            LAST_SEARCH_GRAYSCALE_KEY
          );

          const amcsKey = prompt(
            "grayscale key to search",
            lastSearchGrayscaleKey || ""
          );

          if (!amcsKey) {
            alert("No AMCS key input");
            return;
          }

          localStorage.setItem(LAST_SEARCH_GRAYSCALE_KEY, amcsKey);

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
            // await dynamicallyLoadScript(
            //   "https://bookmarklet.com/lib/crypto-js.min.js"
            // );

            await dynamicallyLoadScript(cryptoJSUrl);
          }

          const AMCS_STORE_SALT = "AMCS_STORE_SALT";

          const bytes = CryptoJS.AES.decrypt(
            localStorage.getItem("AMCS_STORE"),
            AMCS_STORE_SALT
          );

          const amcsStore = JSON.parse(CryptoJS.enc.Utf8.stringify(bytes));

          const userId = sessionStorage.getItem("userId") || "default";

          const searchResult = Object.keys(amcsStore).map((key) => {
            const { grayscales } = amcsStore[key];
            return {
              key,
              currentProfile: userId === key,
              ...grayscales[amcsKey],
            };
          });

          console.log(`result of ${amcsKey}`);
          console.table(searchResult);
        })();

        // await dynamicallyLoadScript(
        //   "https://bookmarklet.com/lib/crypto-js.min.js"
        // );
        await dynamicallyLoadScript(cryptoJSUrl);
      }

      const AMCS_STORE_SALT = "AMCS_STORE_SALT";

      const bytes = CryptoJS.AES.decrypt(
        localStorage.getItem("AMCS_STORE"),
        AMCS_STORE_SALT
      );

      const amcsStore = JSON.parse(CryptoJS.enc.Utf8.stringify(bytes));

      const userId = sessionStorage.getItem("userId") || "default";

      const searchResult = Object.keys(amcsStore).map((key) => {
        const { grayscales } = amcsStore[key];
        return {
          key,
          currentProfile: userId === key,
          ...grayscales[amcsKey],
        };
      });

      console.log(`result of ${amcsKey}`);
      console.table(searchResult);
    })();
  }

  const AMCS_STORE_SALT = "AMCS_STORE_SALT";

  const bytes = CryptoJS.AES.decrypt(
    localStorage.getItem("AMCS_STORE"),
    AMCS_STORE_SALT
  );

  const amcsStore = JSON.parse(CryptoJS.enc.Utf8.stringify(bytes));

  const userId = sessionStorage.getItem("userId") || "default";

  const searchResult = Object.keys(amcsStore).map((key) => {
    const { grayscales } = amcsStore[key];
    return {
      key,
      currentProfile: userId === key,
      ...grayscales[amcsKey],
    };
  });

  console.log(`result of ${amcsKey}`);
  console.table(searchResult);
})();
