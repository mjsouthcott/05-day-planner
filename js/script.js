let $content = $('#content')
let $saveButton = $('#save-button')

let hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]

for (let i = 0; i < hours.length; i++) {
    let $row = $('<div class="row"></div>')
    $row.attr('id', (i + 1))
    
    let $hourCol = $('<div class="col hour"></div>')
    let $p = $('<p></p>')
    $p.text(hours[i])
    $hourCol.append($p)
    $row.append($hourCol)

    let $eventCol = $('<div class="col event past"></div>')
    let $textArea = $('<textarea class="form-control"></textarea>')
    $eventCol.append($textArea)
    $row.append($eventCol)

    let $saveCol = $('<div class="col save"></div>') 
    let $button = $('<button class="save-button"><i class="far fa-save"></button>')
    $saveCol.append($button)
    $row.append($saveCol)

    $content.append($row)
}

$saveButton.on('click', function() {
    
})