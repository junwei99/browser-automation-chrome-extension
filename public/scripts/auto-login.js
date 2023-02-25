/**
 * auto fill in mobile & password based on env, support multiple set
 * click again will insert next login info
 */

(async () => {
  // fill in login info here
  const info = {
    dev1: [
      {
        mobile: "198922380",
        password: "123456",
      },
    ],
    dev2: [
      {
        mobile: "1989001232",
        password: "123456",
      },
    ],
    dev3: [
      {
        mobile: "1989001478",
        password: "123456",
      },
    ],
    dev4: [
      {
        mobile: "198905093",
        password: "123456",
      },
    ],
    dev5: [
      {
        mobile: "1989002694",
        password: "123456",
      },
    ],
    dev6: [
      {
        mobile: "1989004033",
        password: "111222",
      },
      {
        mobile: "149684002",
        password: "111222",
      },
    ],
    sandbox: [
      {
        mobile: "149684002",
        password: "111222",
      },
      {
        mobile: "198930954",
        password: "111222",
        label: "TOTP",
      },
    ],
    sit: [
      {
        mobile: "198925404",
        password: "111222",
        label: "no device link",
      },
      {
        mobile: "198914703",
        password: "111222",
        label: "with device link",
      },
    ],
  };

  const OVERRIDE_DEFAULT_ENV = "TNGD_OVERRIDE_DEFAULT_ENV";

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

    const matchSIT = /sit/.test(host);
    if (matchSIT) {
      return "sit";
    }
  };

  const env = sessionStorage.getItem(OVERRIDE_DEFAULT_ENV) ?? getEnvFromURL();

  if (!env) {
    alert(
      `Failed to get env from host: ${location.host}, kindly ask Mok to help`
    );
  }

  const loginInfo = info[env];

  if (!loginInfo) {
    alert(`Login info on env: ${env} not found`);
    return;
  }

  // required this to insert the value correctly
  // copy from Authenticator Chrome extension
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

  // fill in mobile number
  const elMobileNumber = document.querySelector(
    '[accessbilityid="mobile-number"'
  );

  // find current mobile number and rotate to next number if exist
  const currentMobileNumber = elMobileNumber.value;
  const currentIndex = loginInfo.findIndex(
    ({ mobile }) => mobile === currentMobileNumber
  );
  const selectedIndex = (currentIndex + 1) % loginInfo.length;
  const { mobile, password } = loginInfo[selectedIndex];

  elMobileNumber.value = mobile;
  fireInputEvents(elMobileNumber);

  // fill in password
  const elPassword = document.querySelector('[accessbilityid="password"]');

  // clear password if any
  elPassword.value = "";
  fireInputEvents(elPassword);
  await delay(10);

  for (const value of password.split("")) {
    elPassword.value = value;
    fireInputEvents(elPassword);
    // add some delay to make sure have time to trigger 1 by 1
    await delay(10);
  }
})();
