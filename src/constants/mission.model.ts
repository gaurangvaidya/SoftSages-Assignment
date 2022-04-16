
export interface Mission {
    flightNumber:number;
    missionName:string;
    upcoming:boolean;
    launchYear:number;
    launchDateUnix:number;
    launchDateUTC:string;
    launchDateLocale:string;
    rocket:Rocket;
    missionPatch:string;
}
export interface Rocket{
    rocketId:string;
    rocketName:string;
    rocketType:string;

}