// firebase testers page didn't have search function
// this bookmarklet is used to search tester with email
(() => {
  let success = false;

  const alwaysStartFromPageOne = true;

  const email = prompt("Kindly enter email");
  const emailRegex = new RegExp(email);

  let emailList = [];

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

    const elTesterEmail = [...document.getElementsByClassName("tester-email")]
      .map((element) => element.innerHTML.trim())
      .filter((_email) => emailRegex.test(_email));

    emailList = [...emailList, ...elTesterEmail];
    nextButton.click();
  }

  console.log(emailList.join("\n"));
})();
