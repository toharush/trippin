import "./TripBanner.css";

interface TripBasicInfo {
    city: string;
    duration: number;
    startDate: Date;
    endDate: Date;
}

const london = require("./cityPics/london.png");
const leeds = require("./cityPics/leeds.png");
const liverpool = require("./cityPics/liverpool.png");
const manchester = require("./cityPics/manchester.png");

export function setPic(city: string): any {
    switch (city) {
        case "london": {
            return london;
        }
        case "leeds": {
            return leeds;
        }
        case "liverpool": {
            return liverpool;
        }
        case "manchester": {
            return manchester;
        }
        default:
            return london;
    }
}

export default function TripBanner(props: TripBasicInfo) {
    return (
        <div className="banner">
            <link href='https://fonts.googleapis.com/css?family=Noto Sans' rel='stylesheet'></link>
            <p className="caption">{props.duration} days in {props.city.charAt(0).toUpperCase() + props.city.slice(1)}</p>
            <p className="caption date">{props.startDate.toDateString().split(' ').slice(1).join(' ').toUpperCase()} - 
                {props.endDate.toDateString().split(' ').slice(1).join(' ').toUpperCase()}</p>
            <img src={setPic(props.city)} alt="" className="h-full w-full object-cover"/>
        </div>
    ) 
}
