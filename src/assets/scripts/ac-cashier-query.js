// for ac-cashier-intermediate, need to refine more
(async () => {
  const acCode = await navigator.clipboard.readText()
  let searchParams = new URLSearchParams();
  searchParams.append('ACCodeValue', acCode)

  location.search = '?' + searchParams.toString()
})()