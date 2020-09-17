import './style.css';
import {
    isWithinInterval,
    add,
    differenceInSeconds,
    differenceInHours,
    differenceInDays,
    differenceInMinutes
} from 'date-fns';

var header = document.createElement('h1');
var span = document.createElement('span');
span.id = 'test';

const progressbar = document.createElement('div');
const progress = document.createElement('div');
const progressText = document.createElement('div');

progressText.id = 'progress-text';
progress.id = 'progress';
progressbar.id = 'progress-bar';

header.appendChild(span);
document.body.appendChild(header);

progressbar.appendChild(progress);
progressbar.appendChild(progressText);
document.body.appendChild(progressbar);

let fill = 0;

function update() {

    let now = new Date();

    let year = now.getFullYear();

    let christmas = new Date(`${year}-12-24T00:00:00Z`);
    let newYear = new Date(`${year}-12-31T23:59:59Z`);

    let christmasEnd = new Date(`${year - 1}-12-25T00:00:00Z`);

    // If christmas has already been this year start countdown to next
    let isChristmas = isWithinInterval(now, { start: christmas, end: newYear })

    if (isChristmas) {
        year = year + 1;
    }

    let days = differenceInDays(christmas, now);
    let hours = differenceInHours(christmas, add(now, { days }));
    let minutes = differenceInMinutes(christmas, add(now, { days, hours }));
    let seconds = differenceInSeconds(christmas, add(now, { days, hours, minutes }));

    let test = `${days} ${days == 1 ? 'dag' : 'dager'} 
    ${hours} ${hours == 1 ? 'time' : 'timer'} 
    ${minutes} ${minutes == 1 ? 'minutt' : 'minutter og'} 
    ${seconds} ${seconds == 1 ? 'sekund' : 'sekunder'} til jul!`;

    document.getElementById("test").innerHTML = test;

    let daysProgressed = 365 - days;
    let percent = Math.floor((daysProgressed / 365) * 100);

    if (fill === 0) {

        let anim = function() {
            progress.style.width = (percent * (fill/100)) + '%';
            console.log('lol')
            fill++;
            if (fill <= 100) {
                setTimeout(anim, 5);
            }
        };

        anim();
    } else if (fill === 100) {
        progress.style.width = percent + '%';
    }

    progressText.innerText = percent + '% christmas';

    setTimeout(function () { update(); }, 1000);
}

update();


/**
 * Interesting!
 */
function isDST() {
    const today = new Date();
    const jan = new Date(new Date().getFullYear(), 0, 1);
    const jul = new Date(new Date().getFullYear(), 6, 1);

    const stdTimesoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());

    return today.getTimezoneOffset() < stdTimesoneOffset;
}


