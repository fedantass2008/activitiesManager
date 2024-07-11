let activities = [ // Lista das atividades da section
   // {
   //    name: "Almoço",
   //    date: new Date("2024-07-09 10:00"),
   //    status: false
   // },
   // {
   //    name: "Futebol",
   //    date: new Date("2024-07-09 16:00"),
   //    status: false
   // }
]

const formater = (date) => { // Função com objetos relaacionados a datas e horários
   // DayJS - formata as horas
   return {
      day: {
         month: dayjs(date).format("DD"),
         week: {
            short: dayjs(date).format("ddd"),
            long: dayjs(date).format("dddd")
         }
      },
      month: dayjs(date).format("MMMM"),
      time: dayjs(date).format("HH:mm")
   }
}


// Arrow function
const activityItem = (activity) => { // Criando uma função (mesmo que function a() {})
   let input = `<input onchange="finishActivity(event)" value="${activity.date}" type="checkbox"`
   if(activity.status) input += 'checked'
   input += '>'
   
   const format = formater(activity.date)

   return `
   <div class="card-bg">
      ${input}
      <div>
         <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M7.50008 10L9.16675 11.6667L12.5001 8.33335M18.3334 10C18.3334 14.6024 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6024 1.66675 10C1.66675 5.39765 5.39771 1.66669 10.0001 1.66669C14.6025 1.66669 18.3334 5.39765 18.3334 10Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>

         <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M8.41664 1.81836C9.46249 1.61597 10.5374 1.61597 11.5833 1.81836M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10086C15.5587 3.70022 16.3197 4.46409 16.9158 5.35086M1.8183 11.5834C1.6159 10.5375 1.6159 9.46255 1.8183 8.4167M16.8991 14.6742C16.2998 15.5588 15.5359 16.3198 14.6491 16.9159M18.1816 8.4167C18.384 9.46255 18.384 10.5375 18.1816 11.5834M3.1008 5.32586C3.70016 4.44131 4.46403 3.68026 5.3508 3.0842M5.3258 16.8992C4.44124 16.2998 3.6802 15.536 3.08414 14.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>


         <span>${activity.name}</span>
      </div>
         <time class="short">${format.day.week.short}.  ${format.day.month} <br> ${format.time}</time>
      <time class="full">${format.day.week.long}, dia ${format.day.month} de ${format.month} às ${format.time}</time>
   </div>
   `
}
// activities = []

const reloadList = () => {
   const section = document.querySelector("section") // Seleção do elemento HTML
   section.innerHTML = ''
   // section.innerHTML = activityItem() // Mudança do conteúdo HTML
   
   if(activities.length == 0) {
      section.innerHTML = "<span>Nenhuma atividade cadastrada.</span>"
      return
   }
   for(let activity of activities) {
      section.innerHTML += activityItem(activity)
   }
}
reloadList()

const saveActivity = (event) => {
   event.preventDefault()
   const formInfos = new FormData(event.target)
   
   const name = formInfos.get('activityInput')
   const date = formInfos.get('dateInput')
   const time = formInfos.get('timeInput')
   const fullDate = `${date} ${time}`

   const activity = {
      name, // == name: name
      date: fullDate,
      status: false
   }

   const repeatedActivity = activities.find((a) => {
      return a.date == activity.date
   })

   if(repeatedActivity) return alert("Dia e hora ocupados por outra atividade!")

   activities = [activity, ...activities]
   reloadList()
}

const createDaySelection = () => {
   const dates = [
      "2024-07-08",
      "2024-07-09",
      "2024-07-10",
      "2024-07-11",
   ]

   let daySelection
   
   for(let date of dates) {
      const formated = `${formater(date).day.month} de ${formater(date).month}`
      daySelection += `
      <option value="${date}">${formated}</option>
      `
   }
   document.querySelector('select[name="dateInput"]').innerHTML = daySelection 
}
createDaySelection()

const createTimeSelection = () => {
   let timeSelection

   for(let i = 0; i < 24; i++) {
      const time = String(i).padStart(2, '0') // adicionar 0 a esquerda do horário
      timeSelection += `<option value="${time}:00">${time}:00</option>`
      timeSelection += ` <option value="${time}:30">${time}:30</option>`
   }
   document.querySelector('select[name="timeInput"]').innerHTML = timeSelection
}
createTimeSelection()

const finishActivity = (event) => {
   const inputDate = event.target.value

   const activity = activities.find((activity) => {
      return activity.date == inputDate
   })

   if(!activity) return
   activity.status = !activity.status
}