(() => {
  window.nut.verify = async (input) => {
    if (input.success) {
      alert('Mock success result')
      await input.success() 
    }
  }
  console.log('Mocked window.nut.verify')
})()