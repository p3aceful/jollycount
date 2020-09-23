window.customElements.define('progress-bar', class extends HTMLElement {

    constructor() {
        super();

        this.outer = document.createElement('div');
        this.outer.className = 'progress-outer';

        
        this.inner = document.createElement('div');
        this.inner.className = 'progress-inner';

        this.progressLabel = document.createElement('div');
        this.progressLabel.classList.add('progress-label');

        this.outer.appendChild(this.inner);
        this.outer.appendChild(this.progressLabel);
    }

    static get observedAttributes() {
        return ['current'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {

        const current = this.getProgress();
        this.inner.style = `width: ${current}%`;
        this.progressLabel.textContent = this.getAttribute('label');
    }

    getProgress() {
        const max = this.getAttribute('max') || 100;
        const current = Math.min(max, Math.max(this.getAttribute('current'), 0) || 0);
        const calculatedPercentage = (current / max) * 100;

        return calculatedPercentage;
    }

    connectedCallback() {

        const calculatedPercentage = this.getProgress();

        this.inner.style = `width: ${calculatedPercentage}%`;
        this.progressLabel.textContent = this.getAttribute('label');
        this.appendChild(this.outer);
    }
});

window.customElements.define('jolly-progress', class extends HTMLElement {

    constructor() {
        super();
        this.element = document.createElement('progress-bar');

    }
    static get observedAttributes() {
        return ['date'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        const now = new Date(newVal);

        const start = dfns.startOfYear(now);
        const christmas = new Date(start.getFullYear(), 11, 24);

        const max = dfns.differenceInSeconds(christmas, start);
        const current = dfns.differenceInSeconds(now, start);

        this.element.setAttribute('current', current);
        this.element.setAttribute('max', max);
        this.element.setAttribute('label', `${((current / max) * 100).toFixed(5)}% jolly`);
    }

    connectedCallback() {
        this.element.setAttribute('date', this.getAttribute('date'));
        this.appendChild(this.element);
    }
});

window.customElements.define('jolly-calendar', class extends HTMLElement {

    constructor() {
        super();

        this.hatches = daysOfYear(new Date())
            .filter(date => !dfns.isAfter(date, christmasEve(new Date())))
            .map(date => {
                const element = document.createElement('progress-bar');

                const now = new Date();

                const start = dfns.startOfDay(date);
                const end = dfns.endOfDay(date);

                const max = dfns.differenceInSeconds(end, start);
                const current = dfns.differenceInSeconds(now, start);



                element.setAttribute('current', current);
                element.setAttribute('max', max);
                element.setAttribute('label', Intl.DateTimeFormat('nor', { month: 'short', day: 'numeric'}).format(date));
                
                return [element, date];
            });
    }

    static get observedAttributes() {
        return ['date'];
    }

    attributeChangedCallback() {
        this.hatches.forEach(([element, date]) => {
            const now = new Date(this.getAttribute('date'));
            const start = dfns.startOfDay(date);

            const current = dfns.differenceInSeconds(now, start);
            element.setAttribute('current', current);
        });
    }

    connectedCallback() {
        this.hatches.forEach(([element, _]) => {
            this.appendChild(element);
        });
    }
});

const daysOfYear = date => {
    const dates = [];
    let current = dfns.startOfYear(date);

    while (dfns.getYear(current) === dfns.getYear(date)) {
        dates.push(current);
        current = dfns.addDays(current, 1);
    }

    return dates;
}
