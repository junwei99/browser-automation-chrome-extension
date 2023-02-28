(() => {
  new Array(sessionStorage.length)
    .fill()
    .map((_, index) => sessionStorage.key(index))
    .forEach((key) => {
      sessionStorage.removeItem(key);
    });

  alert("session cleared!");
  location.reload();
})();
