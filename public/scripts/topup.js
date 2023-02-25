(async () => {
  if (location.host !== "batman.tngdigital.com.my") {
    alert('Navigate to "batman.tngdigital.com.my", try again after login');
    location.href = "http://batman.tngdigital.com.my";
    return;
  }

  const mobile = prompt("Mobile number");

  if (!mobile) {
    return;
  }

  const amount = prompt("Topup amount: RM");

  if (!amount) {
    return;
  }

  async function getAccountInfo(mobile) {
    const walletLogin = await fetch(
      `http://batman.tngdigital.com.my/tools/wallet/wallet_login?jstime=${Date.now()}`,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        body: `mobile=${mobile}&pwd=111222&env=sandbox`,
        method: "POST",
        credentials: "include",
      }
    );

    const accountInfo = JSON.parse(await walletLogin.json());

    const {
      result: {
        body: { accountId, balance },
      },
    } = accountInfo;

    return { accountId, balance };
  }

  console.log("=== Start Topup ===");

  const { accountId, balance: oldBalance } = await getAccountInfo(mobile);

  if (!accountId) {
    alert("Login fail");
    console.log("=== Login fail ===");
    return;
  }

  const topupResult = await fetch(
    "https://devtoolcenter.tngdigital.com.my/1.0/api/reload",
    {
      body: `{"mobileNo":${mobile},"amount":${
        amount * 100
      },"userId":${accountId}}`,
      method: "POST",
      credentials: "include",
    }
  );

  console.log(await topupResult.text());

  const { balance: newBalance } = await getAccountInfo(mobile);

  console.table({ mobile, oldBalance, newBalance });

  console.log("=== End Topup ===");
})();
