let $content = $('#content')
let $currentDay = $('#current-day')

// Define and initialize variables
let hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]
let eventsText

// Check if `eventsText` exists in localStorage. If no, initialize and set it; if yes, get it
if (!window.localStorage.getItem('eventsText')) {
    eventsText = new Array(9).fill('')
    window.localStorage.setItem('eventsText', JSON.stringify(eventsText))
} else {
    eventsText = JSON.parse(window.localStorage.getItem('eventsText'))
}

// Create content using for loop
for (let i = 0; i < hours.length; i++) {
    // Create `row` and `col` divs, and initialize their content
    let $row = $(`<div class="row" id="${i}"></div>`)
    let $hourCol = $(`<div class="col hour"><p>${hours[i]}</p></div>`)
    let $eventCol = $(`<div class="col event past"><textarea class="form-control">${eventsText[i]}</textarea></div>`)
    let $saveCol = $(`<div class="col save"><button class="save-button"><i class="far fa-save"></button></div>`) 
    
    // Append `col` divs to `row` div
    $row.append($hourCol)
    $row.append($eventCol)
    $row.append($saveCol)

    // Append `row` div to `content` div
    $content.append($row)
}

// Set event listener to `content` div to respond to `click` events on `save-button` buttons
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