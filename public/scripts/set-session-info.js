(() => {
  const jsonSession = prompt("enter json value for session data");

  const sessionValue = JSON.parse(jsonSession);

  Object.keys(sessionValue).forEach((val) => {
    sessionStorage.setItem(val, sessionValue[val]);
  });
})();
