export class Account {
    private _id: string;
    private email: string;
    private name:string;
    private language: string;
    private created: Date;
    private modified: Date;
    private _class: string;

    constructor(id: string, email: string, language: string, name : string) {
        if(id  != null) {
            this._id = id;
        }
        this.email = email;
        this.language = language;
        this.name = name;
        this._class = "nl.elstarit.event.service.model.Account";
    }

    public setCreated(date: Date){
        this.created = date;
    }

    public updateModified(){
        this.modified = new Date();
    }
}