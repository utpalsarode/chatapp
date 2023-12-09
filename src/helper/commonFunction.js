/* eslint-disable no-var */
// var sha256 = require('js-sha256').sha256
import moment from 'moment'

const convertToBoolean = (binary_value) => {
   if (binary_value === 0 || binary_value === '0') {
      return false
   } else {
      return true
   }
}

const convertToBinary = (boolean) => {
   if (boolean === true) {
      return 1
   } else {
      return 0
   }
}

function checkStrExistInArray(str, array) {
   for (let i = 0; i < array.length; i++) {
      if (array[i].includes(str)) {
         return true
      } else {
         return false
      }
   }
}
/**
 * IW0077
 * This function is called when user get cookies
 */
function getCookie(key) {
   const data = document.cookie
      .split('; ')
      .find(row => row.startsWith(key))
   if (data) {
      return data.split('=')[1]
   }
}

function getJsDate(date, format = 'DD-MM-YYYY') {
   const splitDate = date.split('-')
   switch (format) {
      case 'DD-MM-YYYY':
         return new Date(splitDate[2], Number(splitDate[1]) - 1, splitDate[0])
      case 'MM-DD-YYYY':
         return new Date(splitDate[2], Number(splitDate[0]) - 1, splitDate[1])
      case 'YYYY-MM-DD':
         return new Date(splitDate[0], Number(splitDate[1]) - 1, splitDate[2])
      default:
         break
   }
   return new Date()
}
function chnageDateSeparator(date = '', existing_separator, replace_separator) {
   return date.replaceAll(existing_separator, replace_separator)
}

function getTime(date) {
   return new Date(date).getTime()
}

function getJsTime(jsDate) {
   return (jsDate).getTime()
}

function handlePageRefresh(event) {
   const e = event || window.event
   // Cancel the event
   e.preventDefault()
   if (e) {
      e.returnValue = '' // Legacy method for cross browser support
   }
   return '' // Legacy method for cross browser support
}
function debounce(fn, time) {
   let timer
   return function (...args) {
      clearTimeout(timer)
      timer = setTimeout(() => {
         fn(...args)
      }, time)
   }
}

const advertiseDateCheck = (from_date, to_date) => {
   let dateCheck = moment(new Date()).format("YYYY-MM-DD")
   let fromdate = moment(new Date(from_date)).format("YYYY-MM-DD")
   let todate = moment(new Date(to_date)).format("YYYY-MM-DD")

   if (dateCheck >= fromdate && dateCheck <= todate) {
      return true
   } else {
      return false
   }
}

// find days,year,month ago function
const findDaysDiffrent = (fromDate) => {
   let CreatedDate = new Date(fromDate);
   let today = new Date();
   let requiredDiffrentDays;

   const oneDay = 24 * 60 * 60 * 1000;
   const diffDays = Math.round(Math.abs((CreatedDate - today) / oneDay));

   if (diffDays >= 360) {
      requiredDiffrentDays =
         Math.floor(diffDays / 360) === 1
            ? `${Math.floor(diffDays / 365)} year ago`
            : `${Math.floor(diffDays / 365)} years ago`;
   } else if (diffDays >= 30) {
      requiredDiffrentDays =
         Math.floor(diffDays / 30) === 1
            ? `${Math.floor(diffDays / 30)} month ago`
            : `${Math.floor(diffDays / 30)} months ago`;
   } else if (diffDays < 30) {
      requiredDiffrentDays =
         diffDays === 1 || diffDays === 0 ? `Today` : `${diffDays} days ago`;
   }
   return requiredDiffrentDays;
}

// function supportScript(data) {
//    // eslint-disable-next-line no-use-before-define
//    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date()
//    const s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0]
//    s1.async = true
//    s1.src = 'https://embed.tawk.to/6284e273b0d10b6f3e72d48d/1g3bh968e'
//    s1.charset = 'UTF-8'
//    s1.setAttribute('crossorigin', '*')
//    s0.parentNode.insertBefore(s1, s0)
//    if (data) {
//       Tawk_API.visitor = {
//          name: `${data.name} - ${data.fname} ${data.lname}`,
//          email: `${data.email}`,
//          hash: sha256.hmac('fd9efe80cda8be6e967dfcb08dc96196b4427d37', `${data.email}`)
//       }
//    }
// }
export { convertToBoolean, convertToBinary, checkStrExistInArray, getCookie, getJsDate, getTime, getJsTime, handlePageRefresh, chnageDateSeparator, debounce, advertiseDateCheck, findDaysDiffrent }