let PrayTime = document.getElementsByClassName("PrayTime")

let Duaa = [
 "اللهم صل على محمد، وعلى آل محمد، كما صليت على إبراهيم، وعلى آل إبراهيم، إنك حميد مجيد، وبارك على محمد، وعلى آل محمد، كما باركت على إبراهيم، وعلى آل إبراهيم، [في العالمين] إنك حميد مجيد",
 "اللهم أحيني على سنة نبيك وتوفني على ملته، وأعذني من مضلات الفتن",
 "أستغفر الله العظيم الذي لا إله إلا هو، الحي القيوم، وأتوب إليه",
 "رب اغفر لي خطيئتي يوم الدين",
 "اللهم إني أسألك شهادة في سبيلك",
 "اللهم إني أعوذ بك من علم لا ينفع، وعمل لا يرفع، وقلب لا يخشع، وقول لا يسمع",
 "اللهم إني أسألك الفردوس أعلى الجنة",
 "اللهم ثبتني واجعلني هاديا مهديا",
 "اللهم ثبتني واجعلني هاديا مهديا",
 "اللهم اغفر لي، وارحمني، واهدني، وعافني، وارزقني"
]

var countryListe =["الجزائر","المغرب","تونس","الاردن","مصر","السعودية","تركيا"]

//-------Location--------------------------------------------------------------//



function success(position){
let longitude = position.coords.longitude
let latitude = position.coords.latitude
axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
.then((response)=>{
  let countryName =response.data.countryName
  axios.get(`https://api.aladhan.com/v1/hijriCalendar/1437/4?latitude=${latitude}&longitude=${longitude}&method=2`)
 .then((response)=>{

   
   document.getElementById("bgContainer").innerHTML=""
   document.getElementById("bgContainer").innerHTML=`
   <img src=${countryName}.jpg alt="Background" id="background">
   `

   let now = new Date()
   let month = now.getMonth()+1
   let year = now.getFullYear()
   let day = now.getDay()+12
  axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${countryName}&country=${countryName}&method=1&month=${month}&year=${year}`)
  .then((response)=>{
   document.getElementById("miladiDate").innerHTML=`
   تاريخ اليوم: ${response.data.data[day-1].date.gregorian.date}
   `
   let MonthDay = response.data.data[day].date.hijri.day
   let Day = response.data.data[day-1].date.hijri.weekday.ar
   let hijriMonth = response.data.data[day-1].date.hijri.month.ar
   let hijriYear = response.data.data[day-1].date.hijri.year

   document.getElementById("hijriDate").innerHTML =`
     الموافق ل ${Day} ${MonthDay} ${hijriMonth} ${hijriYear}
   `
   let fajr = response.data.data[day-1].timings.Fajr
   let Dhuhr = response.data.data[day-1].timings.Dhuhr
   let asr = response.data.data[day-1].timings.Asr
   let maghrib = response.data.data[day-1].timings.Maghrib
   let Isha = response.data.data[day-1].timings.Isha

   document.getElementsByClassName("PrayerContainer")[0].innerHTML=`
   <span class="Title">الفجر</span> <br>
   <span class="PrayTime"> ${fajr} <ion-icon name="time-outline"></ion-icon></span>`
   document.getElementsByClassName("PrayerContainer")[1].innerHTML=`
   <span class="Title">الظهر</span> <br>
   <span class="PrayTime"> ${Dhuhr} <ion-icon name="time-outline"></ion-icon></span>`
   document.getElementsByClassName("PrayerContainer")[2].innerHTML=`
   <span class="Title">العصر</span> <br>
   <span class="PrayTime"> ${asr} <ion-icon name="time-outline"></ion-icon></span>`
   document.getElementsByClassName("PrayerContainer")[3].innerHTML=`
   <span class="Title">المغرب</span> <br>
   <span class="PrayTime"> ${maghrib} <ion-icon name="time-outline"></ion-icon></span>`
   document.getElementsByClassName("PrayerContainer")[4].innerHTML=`
   <span class="Title">العشاء</span> <br>
   <span class="PrayTime"> ${Isha} <ion-icon name="time-outline"></ion-icon></span>`
  })
  let max = 9
  let min = 0
  let Random = Math.floor(Math.random() * (max-min + 1))+ min

  document.getElementById("DuaaContainer").innerHTML = `
   <span id="DuaaTitle">دعاءاليوم</span>
   <br>
   <span id="Duaa">${Duaa[Random]}</span>
  `
  if(countryName=="Algeria"){
  countryName ="الجزائر"
  }else if(countryName =="Morocco"){
  countryName ="المغرب"
  }else if(countryName =="Jordan"){
  countryName ="الاردن"
  }else if(countryName =="Tunisia"){
  countryName ="تونس"
  }else if(countryName=="Egypt"){
  countryName = "مصر"
  }else if(countryName =="Turky"){
  countryName ="تركيا"
  }else{
  countryName = "السعودية"
  }

  document.getElementById("country").innerHTML =`
  <span id="city">${countryName}<ion-icon name="location-outline" id="LocationLogo"></ion-icon></span> <br>
  `

  })
})


}

function error(){
 alert("Allow get Location")
}

 navigator.geolocation.getCurrentPosition(success,error)

//--------------------------------------------

function CountrySelector(e){
  let country = String(e.value)
  document.getElementById("bgContainer").innerHTML=""
  document.getElementById("bgContainer").innerHTML=`
  <img src=${country}.jpg alt="Background" id="background">
  `

 let now = new Date()
 let month = now.getMonth()+1
 let year = now.getFullYear()
 let day = now.getDay()+12
 axios.get(`https://api.aladhan.com/v1/calendarByCity?city=${country}&country=${country}&method=1&month=${month}&year=${year}`)
.then((response)=>{
  document.getElementById("miladiDate").innerHTML=`
  تاريخ اليوم: ${response.data.data[day-1].date.gregorian.date}
  `
  let MonthDay = response.data.data[day].date.hijri.day
  let Day = response.data.data[day-1].date.hijri.weekday.ar
  let hijriMonth = response.data.data[day-1].date.hijri.month.ar
  let hijriYear = response.data.data[day-1].date.hijri.year

  document.getElementById("hijriDate").innerHTML =`
    الموافق ل ${Day} ${MonthDay} ${hijriMonth} ${hijriYear}
  `
  let fajr = response.data.data[day-1].timings.Fajr
  let Dhuhr = response.data.data[day-1].timings.Dhuhr
  let asr = response.data.data[day-1].timings.Asr
  let maghrib = response.data.data[day-1].timings.Maghrib
  let Isha = response.data.data[day-1].timings.Isha

  document.getElementsByClassName("PrayerContainer")[0].innerHTML=`
  <span class="Title">الفجر</span> <br>
  <span class="PrayTime"> ${fajr} <ion-icon name="time-outline"></ion-icon></span>`
  document.getElementsByClassName("PrayerContainer")[1].innerHTML=`
  <span class="Title">الظهر</span> <br>
  <span class="PrayTime"> ${Dhuhr} <ion-icon name="time-outline"></ion-icon></span>`
  document.getElementsByClassName("PrayerContainer")[2].innerHTML=`
  <span class="Title">العصر</span> <br>
  <span class="PrayTime"> ${asr} <ion-icon name="time-outline"></ion-icon></span>`
  document.getElementsByClassName("PrayerContainer")[3].innerHTML=`
  <span class="Title">المغرب</span> <br>
  <span class="PrayTime"> ${maghrib} <ion-icon name="time-outline"></ion-icon></span>`
  document.getElementsByClassName("PrayerContainer")[4].innerHTML=`
  <span class="Title">العشاء</span> <br>
  <span class="PrayTime"> ${Isha} <ion-icon name="time-outline"></ion-icon></span>`
})
 let max = 9
 let min = 0
 let Random = Math.floor(Math.random() * (max-min + 1))+ min

 document.getElementById("DuaaContainer").innerHTML = `
  <span id="DuaaTitle">دعاءاليوم</span>
  <br>
  <span id="Duaa">${Duaa[Random]}</span>
 `
if(country=="Algeria"){
 country ="الجزائر"
}else if(country =="Morocco"){
 country ="المغرب"
}else if(country =="Jordan"){
 country ="الاردن"
}else if(country =="Tunisia"){
 country ="تونس"
}else if(country=="Egypt"){
 country = "مصر"
}else if(country =="Turky"){
 country ="تركيا"
}else{
 country = "السعودية"
}


 document.getElementById("country").innerHTML =`
 <span id="city">${country}<ion-icon name="location-outline" id="LocationLogo"></ion-icon></span> <br>
`

}

function soon(){

  alert("This feature will be added soon..")
}