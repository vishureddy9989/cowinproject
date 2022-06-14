let centers = []

const cards = document.querySelector('.cards')
const date = document.querySelector('#date')
let today, d, m, y
today = new Date()
d = today.getDate()
m = today.getMonth() + 1
y = today.getFullYear()
today = `${d}-${m}-${y}`
console.log(today)
cards.innerHTML+=" ";
date.innerHTML += today;


const xhr = new XMLHttpRequest()
const btn = document.querySelector('#search')
btn.addEventListener('click', () => {
  const result = document.querySelector('#input').value
  cards.innerHTML = " "
  let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${result}&date=${today}`
 
  xhr.open('GET', url)
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status == 200) {
      const response = JSON.parse(xhr.responseText)

      if (response.sessions !== []) {

        response.sessions.map((e, i) => {
          let centerinfo = [
            e.name,
            e.address,
            e.vaccine,
            e.date,
            e.min_age_limit,
            e.block_name,
            e.slots,
            e.district_name,
          ]
          centers.push(centerinfo);

          let code = `
           <div class="card">
           <h1>
           <span class="category">Center Name - </span>
           ${centers[i][0]}
         </h1>
         <div class="innerCard">
         <h3>
         <span class="category">Center Address - </span>
         ${centers[i][1]}
       </h3>
       <h3>
         <span class="category">Vaccine Name - </span>
         ${centers[i][2]}
       </h3>
       <h3>
         <span class="category">Date Of Vaccination - </span>
         ${centers[i][3]}
       </h3>
       <h3>
         <span class="category">Minimum Age Limit - </span>
         ${centers[i][4]}
       </h3>
       <h3>
         <span class="category">block name - </span>
         ${centers[i][5]}
       </h3>
       <h3>
         <span class="category">slots - </span>
         ${centers[i][6]}
       </h3>
       <h3>
         <span class="category">District Name - </span>
         ${centers[i][7]}
         </div>`;
          cards.innerHTML += code;
          cards.innerHTML+=" "
        })
      }
      else {
        console.log('data not found')
      }
    }
  }
  xhr.send()

})

