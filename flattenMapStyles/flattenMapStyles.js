const fs = require('fs');

const styles = [
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ededed'
            }
        ]
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f7f7f7'
            }
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff'
            }
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#ffffff'
            },
            {
                weight: 0.2
            }
        ]
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff'
            }
        ]
    },
    {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff'
            }
        ]
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f7f7f7'
            }
        ]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#e5e5e5'
            }
        ]
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on'
            },
            {
                color: '#ffffff'
            }
        ]
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#858585'
            }
        ]
    },
    {
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f2f2f2'
            }
        ]
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#fefefe'
            }
        ]
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#fefefe'
            },
            {
                weight: 1.2
            }
        ]
    }
]
const buildStyles = (styles) => {
    return styles.map((val, idx) => {
        const { featureType, elementType, stylers } = val

        const feature = `feature:${featureType || 'all'}`
        const element = `element:${elementType || 'all'}`
        const styles = stylers.map(style => {
            const name = Object.keys(style)[0]
            const val = style[name].toString().replace('#', '0x')
            return `${name}:${val}`
        }).join('%7C')

        return `style=${`${feature}|${element}|${styles}|`}`
    }).join('&')
}

const stylesStr = buildStyles(styles)

fs.writeFile("styles.txt", stylesStr, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

