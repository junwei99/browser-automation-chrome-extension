// one click to clear sessionStorage for retest purpose
(() => {
  const keepList = ['TNGD_OVERRIDE_DEFAULT_ENV'];
  new Array(sessionStorage.length)
    .fill()
    // get keys
    .map((_, index) => sessionStorage.key(index))
    // remove all key except keep list
    .forEach(key => {
      if (!keepList.includes(key)) {
        sessionStorage.removeItem(key)
      }
    })

  alert("clear")
  location.reload()
})()