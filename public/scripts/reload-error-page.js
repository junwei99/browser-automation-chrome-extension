// 1 click to remove 'error' word from url
// mostly used for ac-cashier-intermediate due to api easily timeout in dev env
location.href = location.href.replace("/error", "/")