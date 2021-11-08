export class Appointment {
    
    constructor(public id: number,
                public text: string,
                public startDate: Date, 
                public endDate: Date,
                public animation: string,
                public description: string,
                public image: string, 
                public allDay?: boolean){

    }
}