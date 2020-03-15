// Define and initialize variables
let $content = $('#content')
let $currentDateTime = $('#current-date-time')
let hours = [
    { displayFormat: '9AM', twentyFourHourFormat: 9 },
    { displayFormat: '10AM', twentyFourHourFormat: 10 },
    { displayFormat: '11AM', twentyFourHourFormat: 11 },
    { displayFormat: '12PM', twentyFourHourFormat: 12 },
    { displayFormat: '1PM', twentyFourHourFormat: 13 },
    { displayFormat: '2PM', twentyFourHourFormat: 14 },
    { displayFormat: '3PM', twentyFourHourFormat: 15 },
    { displayFormat: '4PM', twentyFourHourFormat: 16},
    { displayFormat: '5PM', twentyFourHourFormat: 17 }
]
let eventsText, eventState

// Check if `eventsText` exists in localStorage. If no, initialize and set it; if yes, get it
if (!window.localStorage.getItem('eventsText')) {
    eventsText = new Array(9).fill('')
    window.localStorage.setItem('eventsText', JSON.stringify(eventsText))
} else {
    eventsText = JSON.parse(window.localStorage.getItem('eventsText'))
}

// Display initial current date and time
$currentDateTime.text(moment().format('dddd MMMM Do YYYY, h:mm:ss a'))

// Call `addContent` function to display initial content
addContent(moment().format('k'))

// Call `setInterval` function to update current date and time each second, and content at the top of every hour
setInterval(function() {
    $currentDateTime.text(moment().format('dddd MMMM Do YYYY, h:mm:ss a'))

    // Call `addContent` function at the top of every hour to update display
    if (moment().format('mm') === '00' && moment().format('ss') === '00') {
        $content.empty()
        addContent(moment().format('k'))
    }
}, 1000)

// Define `addContent` function
function addContent(currentHour) {
    // Create content using for loop
    for (let i = 0; i < hours.length; i++) {
        // Set `eventState` by comparing current hour to hour represented by `row` div
        if (Number(currentHour) > hours[i].twentyFourHourFormat) {
            eventState = 'past'
        } else if (Number(currentHour) === hours[i].twentyFourHourFormat) {
            eventState = 'present'
        } else {
            eventState = 'future'
        }

        // Create `row` and `col` divs, and initialize their content
        let $row = $(`<div class="row" id="${i}"></div>`)
        let $hourCol = $(`<div class="col hour"><p>${hours[i].displayFormat}</p></div>`)
        let $eventCol = $(`<div class="col event ${eventState}"><textarea class="form-control">${eventsText[i]}</textarea></div>`)
        let $saveCol = $(`<div class="col save"><button class="save-button"><i class="far fa-save"></button></div>`) 
    
        // Append `col` divs to `row` div
        $row.append($hourCol)
        $row.append($eventCol)
        $row.append($saveCol)

        // Append `row` div to `content` div
        $content.append($row)
    }
}

// Add event listener to `content` div to respond to `click` events on `save-button` buttons
$content.on('click', '.save-button', function() {
    $this = $(this)

    // Get index of button clicked
    let index = $this.parents('.row').attr('id')

    // Get value of corresponding textarea
    let eventText = $this.parent().siblings('.event').children().val()

    // Set corresponding array element value to text and set in localStorage
    eventsText[index] = eventText
    window.localStorage.setItem('eventsText', JSON.stringify(eventsText))
})