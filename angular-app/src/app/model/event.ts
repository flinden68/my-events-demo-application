export class Event {
    _id: string;
    id: string;
    title: string;
    description: string;
    start: number;
    end: number;
    created: Date;
    modified: Date;
    userId: string;
    location: string;
    _class: string = "nl.elstarit.event.service.model.Event";

    /*constructor(id: string, title: string, description: string, start: number, end: number, userId: string, location: string) {
        if(id  != null) {
            this._id = id;
            this.id = id;
        }
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
        this.userId = userId;
        this.location = location;
        this._class = "nl.elstarit.event.service.model.Event";
    }*/

    public setCreated(date: Date){
        this.created = date;
    }

    public updateModified(){
        this.modified = new Date();
    }

    public getStartDate(){
      return new Date(this.start);
    }

    public setStartDate(date : Date){
        this.start = date.getTime()
    }

    public getEndDate(){
      return new Date(this.end);
    }

    public setEndDate(date : Date){
      this.end = date.getTime()
    }
}
