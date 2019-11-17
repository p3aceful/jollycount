import moment from 'moment';

var header = document.createElement('h1');
var span = document.createElement('span');
span.id = 'test';

header.appendChild(span);
document.body.appendChild(header);

function update() {
    var xmas = moment(new Date('December 24, 2019, 00:00:00'));
    var now = moment(Date.now());
    var days = xmas.diff(now, 'days');
    var hours = xmas.subtract(days, 'days').diff(now, 'hours');
    var minutes = xmas.subtract(hours, 'hours').diff(now, 'minutes');
    var seconds = xmas.subtract(minutes, 'minutes').diff(now, 'seconds');

    var test = `${days} ${days == 1 ? 'dag' : 'dager'} 
    ${hours} ${hours == 1 ? 'time' : 'timer'} 
    ${minutes} ${minutes == 1 ? 'minutt' : 'minutter og'} 
    ${seconds} ${seconds == 1 ? 'sekund' : 'sekunder'} til jul!`;

    document.getElementById("test").innerHTML = test;
    setTimeout(function () { update(); }, 1000);
}

update();