/**
 * Get data from wikipedia
 * https://en.wikipedia.org/wiki/List_of_deadliest_aircraft_accidents_and_incidents
 */
const header = []
document.querySelectorAll("#mw-content-text > div.mw-parser-output > table > thead > tr > th").forEach((row, idx) => {
    if (idx >= 2 && idx <= 8) {
        header.push(row.innerText)
    }
});
const offset = 1;
const data = [];
document.querySelectorAll("#mw-content-text > div.mw-parser-output > table > tbody > tr").forEach((tr) => {
    const row = {};
    tr.querySelectorAll('td').forEach((td, idx) => {
        const index = idx - offset;
        const title = header[index];
        console.log('index', index, title, idx);
        if (title) {
            const titleIdx = title.toLowerCase();
            if (index === 1) {
                const href = td.querySelector(`a`);
                row[titleIdx] = {
                    href: href.href,
                    name: href.innerText
                };
            } else {
                row[titleIdx] = td.innerText;
            }
        }
    })
    data.push(row)
});
/**
 * get summary from wikipedia
 */
const newData = [];
data.forEach(async (item) => {
    const aircraft = item.aircraft
    const { href } = aircraft
    const title = href.split('/').pop()
    if (title) {
        const res = await fetch(`http://en.wikipedia.org/api/rest_v1/page/summary/${title}`, {
            method: 'GET',
            redirect: 'follow',
        });
        const wikipedia = await res.json();
        const { thumbnail, originalimage, extract, extract_html } = wikipedia;
        newData.push({
            ...item,
            thumbnail, originalimage, extract, extract_html
        });
    }
    console.log('newData', newData);
})