let darkmode = document.querySelector('.darkmode')
let loading = document.querySelector('.loading')
let container = document.querySelector('.contrys')
let data = [];
document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('dark')){
    document.querySelector('html').classList.add('dark')
    darkmode.innerHTML = '🌙 Light Mode'
  }
  else{
    darkmode.innerHTML = '☀️ Dark Mode'
  }
})
darkmode.addEventListener('click',()=>{
  document.querySelector('html').classList.toggle('dark')
  
  if(document.querySelector('html').classList.contains('dark')){
    localStorage.setItem('dark', true)
    darkmode.innerHTML = '☀️ Light Mode'
  }
  else{
    darkmode.innerHTML = '🌙 Dark Mode'
    localStorage.setItem('dark', false)
  }
})
const fetchdata = async (url='https://restcountries.com/v3.1/all') => {
  loading.style.display = 'flex'
  container.innerHTML = ''
  data = await fetch(url)
    .then(res => res.json())
  data.length>50 &&(data= data.slice(0, 50)) 
  loading.style.display = 'none'
  console.log(data)
  data.forEach((county) => {
    container.innerHTML += `
      <div class="contry flex max-h-60 flex-col md:gap-2 gap-1 shadow-md hover:scale-105 transition-all duration-200 dark:bg-[#2B3743] bg-white rounded-md">
            <img class="w-full h-2/5 rounded-t-md" src="${county.flags.png}" alt="">
            <div class="basis-auto p-4 overflow-hidden">
              <h4 class='dark:text-white text-[#2B3743]'>${county.name.common}</h4>
              <p class="dark:text-gray-400 text-[#2B3743]">Population: ${county.population}</p>
              <p class="dark:text-gray-400 text-[#2B3743]">Region: ${county.region}</p>
              <p class="dark:text-gray-400 text-[#2B3743]">Capital: ${county.capital}</p>
            </div>
          </div>
    `
  })
  
}
fetchdata()
let input = document.querySelector('.input')
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    let value = input.value
    if(value==""){
      fetchdata()
    }
    else{
      fetchdata(`https://restcountries.com/v3.1/name/${value}`)
    }
  }
})
let filter = document.querySelector('#filter')
filter.addEventListener('change', (e) => {
  let value = e.target.value
  if(value==""){
    fetchdata()
  }
  else{
    fetchdata(`https://restcountries.com/v3.1/region/${value}`)
  }
})
