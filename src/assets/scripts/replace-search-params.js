(async () => {
  // check if able to use clipboard
  if (!navigator.clipboard) {
    alert('Clipboard not available, kindly visit via https or localhost, and turn on allow clipboard in page settings')
    return
  }

  try {
    const urlText = await navigator.clipboard.readText()
    const searchParams = new URL(urlText).searchParams
    location.search = '?' + searchParams.toString()
  } catch (error) {
    alert('Fail to replace search params')
    console.log(error);
  }
})()