(async () => {
  function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  async function release() {
    const buttons = [
      '[aria-label="Choose App"]',
      '[aria-label="Submit Choose App"]',
      '[aria-label="apply for publishing"]',
      '[aria-label="Confirm Apply"]',
    ];

    for (const selector of buttons) {
      console.log(`start selector ${selector}`);
      let element = null;
      let count = 0;

      // loop until get the element
      while (count < 5000 && (!element || element.disabled)) {
        console.log(count);
        // sleep 100ms
        await sleep(100);
        element = document.querySelector(selector);
        count++;
      }

      element.click();
      await sleep(100);
    }

    // back to mp landing
    history.back();
  }

  async function releaseBoth() {
    await release();
    await release();
  }

  await releaseBoth();
})();
