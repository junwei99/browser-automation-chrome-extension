// to switch env without any code changed
// useful in development
(() => {
  const OVERRIDE_DEFAULT_ENV = 'TNGD_OVERRIDE_DEFAULT_ENV'
  const env = sessionStorage.getItem(OVERRIDE_DEFAULT_ENV) ?? 'dev1'
  const newEnv = prompt('Override default env', env)

  if (newEnv) {
    sessionStorage.setItem(OVERRIDE_DEFAULT_ENV, newEnv)
    // reload after success to take effect
    location.reload()
  }
})()