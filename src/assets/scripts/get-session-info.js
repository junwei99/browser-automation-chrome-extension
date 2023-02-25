(() => {
  const sessionId = sessionStorage.getItem("sessionId");
  const loginId = sessionStorage.getItem("loginId");
  const userId = sessionStorage.getItem("userId");

  if (sessionId && loginId && userId) {
    console.log(
      `%c${JSON.stringify({ sessionId, loginId, userId })}`,
      "color:#c7edd1"
    );
    prompt("session data", JSON.stringify({ sessionId, loginId, userId }));
  } else {
    console.warn("failed to load session data");
  }
})();
