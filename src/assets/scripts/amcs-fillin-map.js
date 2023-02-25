// not working
(() => {
  const mapValue = prompt("Kindly enter map");

  if (!mapValue) {
    alert("missing map");
    return;
  }

  let value;
  eval("value = " + mapValue);

  function clickAddButton() {
    document.querySelector('[aria-label="icon: plus"]').click();
  }

  Object.keys(value).forEach(() => {
    clickAddButton();
  });

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

  const keyInputs = document.querySelectorAll('input[placeholder="Key"]');
  const valueInputs = document.querySelectorAll('input[placeholder="Value"]');

  Object.entries(value).forEach(async ([key, value], index) => {
    keyInputs[index].value = key;
    fireInputEvents(keyInputs[index]);

    valueInputs[index].value = value;
    fireInputEvents(valueInputs[index]);
  });
})();
