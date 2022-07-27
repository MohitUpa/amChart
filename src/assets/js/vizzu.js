import Vizzu from 'https://cdn.jsdelivr.net/npm/vizzu@latest/dist/vizzu.min.js';

import { data } from 'https://lib.vizzuhq.com/test/integration/test_data/chart_types_eu.js';

let chart = new Vizzu('vizzuCanvas');

chart.animate({
    data: data,
    config: {
        channels: {
            color: { set: ['Joy factors'] },
            label: { set: ['Country_code'] },
            size: { set: ['Country_code', 'Value 2 (+)'] }
        },
        title: 'Stacked Bubble Chart',
        geometry: 'circle'
    }
});


chart.animate({
    config: {
        channels: {
            x: { set: ['Country_code', 'Value 2 (+)'] },
            y: { set: ['Joy factors'] },
            label: { set: null },
            /* The stacking is eliminated when we remove
            the extra dimension from the size channel. */
            size: { set: null } 
        },
        title: 'Bar Chart',
        geometry: 'rectangle',
        orientation: 'vertical'
    }
});


chart.animate({
    config: {
        channels: {
            x: { detach: ['Country_code'] },
            label: { set: ['Value 2 (+)'] }
        }
    }
});