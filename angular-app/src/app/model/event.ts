export class Event {
    private _id: string;
    private id: string;
    private title: string;
    private description: string;
    private start: number;
    private end: number;
    private created: Date;
    private modified: Date;
    private userId: string;
    private location: string;
    private _class: string;

    constructor(id: string, title: string, description: string, start: number, end: number, userId: string, location: string) {
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
    }

    public setCreated(date: Date){
        this.created = date;
    }

    public updateModified(){
        this.modified = new Date();
    }

    public getId(){
      return this._id;
    }
}
