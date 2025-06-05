
const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};


const BASE_URL =
  "https://2024-03-06.currency-api.pages.dev/v1/currencies";

let dropdowns=document.querySelectorAll(".dropdown select"); 
let btn=document.querySelector("form button");
let amount=document.querySelector(".amount input");
let fromcurr=document.querySelector(".from select");
let tocurr=document.querySelector(".to select");
//drop down integration
for( select of dropdowns)
{
    for( country in countryList)
    {
        let nwoption =document.createElement("option")
        nwoption.innerText=country;
        nwoption.value=country;
        select.append(nwoption);
      
        if(select.name==="from"&& country==="USD")
        {
           nwoption.selected="selected";
        }
        else if(select.name==="to"&& country==="PKR")
        {
            nwoption.selected="selected";
        }
    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}
//drop down integration


//flags upadtion
// let flags=document.querySelectorAll(".dropdown img");
const updateFlag = (element) => {
let currency = element.value;
let counrty=countryList[currency];
let newsrc=`https://flagsapi.com/${counrty}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src = newsrc;


}
//flags upadtion


//exchange rate
btn.addEventListener("click", (e) => {
    e.preventDefault();
    let amountValue = amount.value;
    if(amountValue===0||amountValue<1)
    {
        amountValue=1;
        amount.value="1";  
    }
   

     
exchangerate();
});


const exchangerate=async()=>{
    const url=`${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    //  let response=await fetch(url);
    //  let data=response.json();
    //  let rate=data;
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log("Currency Data:", data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]
        
        );
        let curate=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
        let amt=Number(amount.value);
        let wiht=amt*curate;
        console.log(wiht);
        
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
 

 
}
//exchange rate


