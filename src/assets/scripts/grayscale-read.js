(async () => {
  function dynamicallyLoadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = () => {
        resolve()
      }
      script.onerror = () => {
        reject()
      }
      document.head.appendChild(script);
    })
  }

  if (typeof CryptoJS === 'undefined') {
    await dynamicallyLoadScript('https://bookmarklet.com/lib/crypto-js.min.js')
  }

  const AMCS_STORE_SALT = 'AMCS_STORE_SALT'

  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('AMCS_STORE'), AMCS_STORE_SALT)

  const amcsStore = JSON.parse(CryptoJS.enc.Utf8.stringify(bytes))
  
  console.log(amcsStore);
})()