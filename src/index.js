import './style.css';
import {
    isAfter,
    isWithinInterval,
    add,
    addDays,
    differenceInSeconds,
    differenceInHours,
    differenceInDays,
    differenceInMinutes,
    startOfYear,
    getYear
} from 'date-fns';

const header = document.createElement('h1');
const span = document.createElement('span');
span.id = 'test';


const lukeContainer = document.createElement('div');
lukeContainer.id = 'luke-container';
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
document.body.appendChild(lukeContainer);


const daysOfYear = date => {
    const dates = [];
    let current = startOfYear(date);

    while (getYear(current) === getYear(date)) {
        dates.push(current);
        current = addDays(current, 1);
    }

    return dates;
}

const christmasEve = date => {
    const year = date.getFullYear();
    return new Date(year, 11, 24);
}


daysOfYear(new Date())
    .filter(date => !isAfter(date, christmasEve(new Date())))
    .map((date, i) => {
        let element = document.createElement('div');
        element.textContent = i + 1;
        
        if (isAfter(date, new Date())) {
            element.className = 'luke';
        } else {
            element.className = 'luke open';
        }

        lukeContainer.appendChild(element);
    });


let fill = 0;

function update() {

    const now = new Date();
    let christmas = christmasEve(new Date());

    const days = differenceInDays(christmas, now);
    const hours = differenceInHours(christmas, add(now, { days }));
    const minutes = differenceInMinutes(christmas, add(now, { days, hours }));
    const seconds = differenceInSeconds(christmas, add(now, { days, hours, minutes }));

    const test = `${days} ${days == 1 ? 'dag' : 'dager'} 
    ${hours} ${hours == 1 ? 'time' : 'timer'} 
    ${minutes} ${minutes == 1 ? 'minutt' : 'minutter og'} 
    ${seconds} ${seconds == 1 ? 'sekund' : 'sekunder'} til jul!`;

    document.getElementById("test").textContent = test;

    let daysProgressed = 365 - days;
    let percent = Math.floor((daysProgressed / 365) * 100);

    if (fill === 0) {

        let anim = function () {
            progress.style.width = (percent * (fill / 100)) + '%';
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
