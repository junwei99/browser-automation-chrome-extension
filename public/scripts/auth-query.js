// For authorize project to get the valid search params
// should be no used now since localhost index page already fixed
(() => {
  let searchParams = new URLSearchParams();
  searchParams.append('clientId', '2018092511204800001136')
  searchParams.append('merchantContractId', '201808225105101001'.concat(Date.now()))
  searchParams.append('merchantId', '217120000000032811675')
  searchParams.append('subMerchantId', '2188400000001017')
  searchParams.append('scopes', 'AGREEMENT_PAY,OTP_SEND')
  searchParams.append('subMerchantName', 'Apple Services')
  searchParams.append('redirectUrl', 'https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/userSignedAlipay?clientType=ma&creditType=APWC&safariid=ExternalPaymentVerificationController&iso3CountryCode=CHN&partnerToken=1545839916394-914240990&appInstalled=0&APWCInstalled=0&context=edit')

  location.search = '?' + searchParams.toString()
})()

