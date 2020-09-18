import './style.css';

import * as dfns from 'date-fns';

window.customElements.define('progress-bar', class extends HTMLElement {


    connectedCallback() {

        this.render();
        setInterval(this.render.bind(this), 1000);
    }

    render() {

        const date = new Date();
        const christmas = dfns.differenceInSeconds(new Date(date.getFullYear(), 11, 24), new Date(date.getFullYear(), 0, 1));
        const progressed = dfns.differenceInSeconds(date, new Date(date.getFullYear(), 0, 1));

        const template = `
            <div class="progress-bar">
                <div class="progress" style="width:${(progressed / christmas) * 100}%"></div>
                <div class="progress-text">${((progressed / christmas) * 100).toFixed(7)}% jolly</div>
            </div>
        `;
        this.innerHTML = template;
    }
});

;

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

document.body.appendChild(document.createElement('progress-bar'));
progressbar.appendChild(progress);
progressbar.appendChild(progressText);
document.body.appendChild(progressbar);
document.body.appendChild(lukeContainer);

// document.body.appendChild(document.body.createElement('div'))

const daysOfYear = date => {
    const dates = [];
    let current = dfns.startOfYear(date);

    while (dfns.getYear(current) === dfns.getYear(date)) {
        dates.push(current);
        current = dfns.addDays(current, 1);
    }

    return dates;
}

const christmasEve = date => {
    const year = date.getFullYear();
    return new Date(year, 11, 24);
}


daysOfYear(new Date())
    .filter(date => !dfns.isAfter(date, christmasEve(new Date())))
    .map((date, i) => {
        let element = document.createElement('div');
        let options = { month: 'short', day: 'numeric'};
        element.textContent = new Intl.DateTimeFormat('nor', options).format(date);

        if (dfns.isAfter(date, new Date())) {
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

    const days = dfns.differenceInDays(christmas, now);
    const hours = dfns.differenceInHours(christmas, dfns.add(now, { days }));
    const minutes = dfns.differenceInMinutes(christmas, dfns.add(now, { days, hours }));
    const seconds = dfns.differenceInSeconds(christmas, dfns.add(now, { days, hours, minutes }));

    const test = `${days} ${days == 1 ? 'dag' : 'dager'} 
    ${hours} ${hours == 1 ? 'time' : 'timer'} 
    ${minutes} ${minutes == 1 ? 'minutt' : 'minutter og'} 
    ${seconds} ${seconds == 1 ? 'sekund' : 'sekunder'} til jul!`;

    document.getElementById("test").textContent = test;

    setTimeout(function () { update(); }, 1000);
}

update();
