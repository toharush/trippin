const activity = {
    "title": "Tampu Restaurante",
    "id": "here:pds:place:604aabd1-8a9e2cea8f70096f07b4ce344b9a422f",
    "language": "es",
    "ontologyId": "here:cm:ontology:restaurant",
    "resultType": "place",
    "address": {
        "label": "Tampu Restaurante, Carretera Hiram Bingham, 08680 Machu Picchu, Perú",
        "countryCode": "PER",
        "countryName": "Perú",
        "state": "Cusco",
        "county": "Urubamba",
        "city": "Machu Picchu",
        "street": "Carretera Hiram Bingham",
        "postalCode": "08680"
    },
    "position": { "lat": -13.16583, "lng": -72.54308 },
    "access": [{ "lat": -13.16582, "lng": -72.54309 }],
    "distance": 379,
    "categories": [
        { "id": "100-1000-0000", "name": "Restaurante", "primary": true }
    ],
    "references": [
        { "supplier": { "id": "tripadvisor" }, "id": "1568029" },
        { "supplier": { "id": "tripadvisor" }, "id": "1568031" }
    ],
    "foodTypes": [
        { "id": "407-000", "name": "Peruana", "primary": true },
        { "id": "400-000", "name": "Sudamericana" },
        { "id": "800-064", "name": "Internacional" }
    ],
    "contacts": [
        {
            "phone": [{ "value": "+51984816956" }],
            "www": [
                {
                    "value": "http://www.facebook.com/TinkuyBuffetRestaurant"
                },
                {
                    "value": "http://www.sanctuarylodge.net/web/omac/tampu.jsp"
                }
            ]
        }
    ],
    "openingHours": [
        {
            "text": ["lun.-dom.: 11:00 - 15:30"],
            "isOpen": true,
            "structured": [
                {
                    "start": "T110000",
                    "duration": "PT04H30M",
                    "recurrence": "FREQ:DAILY;BYDAY:MO,TU,WE,TH,FR,SA,SU"
                }
            ]
        }
    ]
}

function convertOpeningHours(activity:any, day:any) {
    const openingHours = activity.openingHours[0].structured[0];
    const startTime = openingHours.start;
    const duration = openingHours.duration;
  
    const days = openingHours.recurrence.split(';')[1].split(':')[1].split(',');
  
    const dayIndex = days.findIndex((d:any) => d === day.toUpperCase());
  
    if (dayIndex === -1) {
      return "The restaurant is closed on " + day;
    }
  
    const startHour = parseInt(startTime.substring(1, 3));
    const startMinute = parseInt(startTime.substring(3, 5));
    const durationHours = parseInt(duration.substring(2, 4));
    const durationMinutes = parseInt(duration.substring(5, 7));
  
    const closeMinute = (startMinute + durationMinutes) % 60;
    const closeHour = (startHour + durationHours + Math.floor((startMinute + durationMinutes) / 60)) % 24;

    const formattedStartTime = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
    const formattedCloseTime = `${closeHour.toString().padStart(2, '0')}:${closeMinute.toString().padStart(2, '0')}`;
  
    return {
        openHour: formattedStartTime,
        closeHour: formattedCloseTime
    };
  }

const day = 'mo';

const openingHours = convertOpeningHours(activity, day);
console.log(openingHours);
  