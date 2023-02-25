// firebase testers page didn't have search function
// this bookmarklet is used to search tester with email
(() => {
  let success = false;

  const needToDelete = false;
  const alwaysStartFromPageOne = true;

  const email = prompt("Kindly enter email");

  if (alwaysStartFromPageOne) {
    const prevButton = document.querySelector('[aria-label="Previous page"]');
    // back to page 1
    while (true) {
      if (prevButton.disabled) {
        break;
      }
      prevButton.click();
    }
  }

  const nextButton = document.querySelector('[aria-label="Next page"]');

  while (true) {
    if (nextButton.disabled) {
      break;
    }

    const elTesterEmail = [
      ...document.getElementsByClassName("tester-email"),
    ].find((element) => {
      return element.innerHTML.trim() === email;
    });
    // found the email
    if (elTesterEmail) {
      success = true;
      elTesterEmail.parentElement.style.backgroundColor = "red";
      elTesterEmail.scrollIntoView();

      if (needToDelete) {
        // click checkbox
        elTesterEmail.parentElement.parentElement.parentElement.parentElement.parentElement
          .getElementsByTagName("mat-checkbox")[0]
          .click();
        // click delete button
        document.getElementsByClassName("delete-testers-btn")[0].click();

        // manually confirm delete
      }
      break;
    }
    nextButton.click();
  }

  if (success) {
    console.log("complete, tester email highlighted as red");
  } else {
    console.log("Not found");
  }
})();
