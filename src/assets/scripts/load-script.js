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

  const url = prompt('Please enter the url of the script you wish to load')
  if (!url) return

  dynamicallyLoadScript(url)
    .then(() => alert('Loaded'))
    .catch(() => alert('Failed'))
})()