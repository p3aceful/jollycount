import './style.scss';

import * as dfns from 'date-fns';

const christmasEve = date => {
    const year = date.getFullYear();
    return new Date(year, 11, 24);
}

window.customElements.define('jolly-app', class extends HTMLElement {

    constructor() {
        super();

        this.elements = [
            document.createElement('jolly-count'),
            // document.createElement('jolly-progress'),
            // document.createElement('jolly-calendar'),
        ];

        this.elements.forEach(element => {
            element.setAttribute('date', new Date().toISOString());
        });
    }

    connectedCallback() {
        this.elements.forEach(element => this.appendChild(element));

        setInterval(() => {
            this.elements.forEach(element => {
                element.setAttribute('date', new Date().toISOString());
            });
        }, 1000);
    }
});

window.customElements.define('jolly-count', class extends HTMLElement {

    static get observedAttributes() {
        return ['date'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        this.updateCount();
    }

    updateCount() {
        const now = this.hasAttribute('date') ? new Date(this.getAttribute('date')) : new Date();
        let christmas = christmasEve(new Date());

        const days = dfns.differenceInDays(christmas, now);
        const hours = dfns.differenceInHours(christmas, dfns.add(now, { days }));
        const minutes = dfns.differenceInMinutes(christmas, dfns.add(now, { days, hours }));
        const seconds = dfns.differenceInSeconds(christmas, dfns.add(now, { days, hours, minutes }));

        const dayText = days === 1 ? 'dag' : 'dager';
        const hourText = hours === 1 ? 'time' : 'timer';
        const minuteText = minutes === 1 ? 'minutt og' : 'minutter og';
        const secondText = seconds === 1 ? 'sekund' : 'sekunder'
        this.innerHTML = `<h1>${days} ${dayText}</h1><h1>${hours} ${hourText}</h1><h1>${minutes} ${minuteText}</h1><h1>${seconds} ${secondText} til jul!</h1>`;
    }

    connectedCallback() {
        this.updateCount();
    }
});

const app = document.createElement('jolly-app');
document.body.appendChild(app);

