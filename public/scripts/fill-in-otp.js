(async () => {
  const getEnvFromURL = () => {
    const host = location.host;
    const matchDev = host.match(/dev(\d)/);
    if (matchDev) {
      return matchDev[0];
    }

    const matchSandbox = /(sandbox|sd)/.test(host);
    if (matchSandbox) {
      return "sandbox";
    }
  };

  const OVERRIDE_DEFAULT_ENV = "TNGD_OVERRIDE_DEFAULT_ENV";

  const env =
    sessionStorage.getItem(OVERRIDE_DEFAULT_ENV) ?? getEnvFromURL() ?? "dev1";

  let mobile = "";
  const storageMobile = sessionStorage.getItem("mobile");

  if (!storageMobile) {
    mobile = prompt("Mobile number");
  } else {
    mobile = storageMobile;
  }

  async function getOTP(mobile, env) {
    const getOTP = await fetch(`/api/get-otp/${mobile}/${env}`);

    if (getOTP.status != 200) {
      return undefined;
    }

    const { otp } = await getOTP.json();
    return otp;
  }

  const otp = (await getOTP(mobile, env)) || "000000";

  function fireInputEvents(inputBox) {
    const events = [
      new KeyboardEvent("keydown"),
      new KeyboardEvent("keyup"),
      new KeyboardEvent("keypress"),
      new Event("input", { bubbles: true }),
      new Event("change", { bubbles: true }),
    ];
    for (const event of events) {
      inputBox.dispatchEvent(event);
    }
    return;
  }

  function delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  // fill in otp
  const elPin = document.querySelector(".input-pin");
  for (const value of otp.split("")) {
    elPin.value += value;
    fireInputEvents(elPin);
    // add some delay to make sure have time to trigger 1 by 1
    await delay(10);
  }
})();
