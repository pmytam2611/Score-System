var element = document.querySelector('.display-result table tbody')
element.innerHTML = ''
var checkbox = document.getElementById('free-point')
var addSubject = document.getElementById('add')
var calculator = document.getElementById('result-btn')

var year = document.getElementById('year')
var semester = document.getElementById('semester')
var nameSubject = document.querySelector('.subject-input')
var credit = document.querySelector('.credit-input')
var point = document.querySelector('.result-input')
var condition = document.getElementById('condition')

function changePoint(point){
    if(point=='A') return 4.0
    else if(point=='B+') return 3.5
    else if(point=='B') return 3.0
    else if(point=='C+') return 2.5
    else if(point=='C') return 2.0
    else if(point=='D+') return 1.5
    else if(point=='D' || point=='M') return 1.0
    else return 0
}

let general = {}

addSubject.addEventListener('click', ()=>{
    let tr = document.createElement('tr')

    let td1 = document.createElement('td')
    td1.setAttribute('style', 'text-align: center; vertical-align: middle;')
    td1.textContent = nameSubject.value

    let td2 = document.createElement('td')
    td2.setAttribute('style', 'text-align: center; vertical-align: middle;')
    td2.textContent = credit.value

    let td3 = document.createElement('td')
    td3.setAttribute('style', 'text-align: center; vertical-align: middle;')
    td3.textContent = point.value

    let td4 = document.createElement('td')
    td4.setAttribute('style', 'text-align: center; vertical-align: middle;')
    td4.textContent = year.value

    let td5 = document.createElement('td')
    td5.setAttribute('style', 'text-align: center; vertical-align: middle;')
    td5.textContent = semester.value

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    element.appendChild(tr)
    let currentData = JSON.parse(sessionStorage.getItem('general')) || {}
    const variable = 'year'+year.value+'_semester'+semester.value
    if(!currentData[variable]) currentData[variable] = []
    
    currentData[variable].push({
        "nameSubject": nameSubject.value,
        "credit": credit.value,
        "point": changePoint(point.value),
        "year": year.value,
        "semester": semester.value,
        "condition": condition.checked
    })

    sessionStorage.setItem('general', JSON.stringify(currentData))
})

var retake = document.getElementsByName('retake')

checkbox.addEventListener('change', ()=>{
    if(checkbox.checked){
        document.querySelector('.result-input').disabled = true
        retake[0].disabled = true
        retake[1].disabled = true
        document.getElementById('clearSelection').disabled = true
    } 
    else{
        document.querySelector('.result-input').disabled = false
        retake[0].disabled = false
        retake[1].disabled = false
        document.getElementById('clearSelection').disabled = false
    } 
})

function clearSelection() {
    retake.forEach(radio => {
        radio.checked = false;
    });
    document.querySelector('.retake-input').disabled = true
}

retake.forEach(radio=>{
    radio.addEventListener('change', ()=>{
        document.querySelector('.retake-input').disabled = radio !== document.getElementById('radio2')
    })
})

calculator.addEventListener('click', ()=>{
    console.log(JSON.parse(sessionStorage.getItem('general')))
})