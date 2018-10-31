export class Event {
    private _id: string;
    //private id: string;
    private title: string;
    private description: string;
    private start_date: number;
    private end_date: number;
    private created: Date;
    private modified: Date;
    private userId: string;
    private _class: string;

    constructor(id: string, title: string, description: string, start_date: number, end_date: number, userId: string) {
        if(id  != null) {
            this._id = id;
        }
        this.title = title;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.userId = userId;
        this._class = "nl.elstarit.event.service.model.Event";
    }

    public setCreated(date: Date){
        this.created = date;
    }

    public updateModified(){
        this.modified = new Date();
    }
}