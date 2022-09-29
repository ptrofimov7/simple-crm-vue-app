export default function currencyFormat(value, currency='UAH') {
   return new Intl.NumberFormat('Ua-ua', {style: 'currency', currency}).format(value)
}