export class Account {
    _id: string;
    email: string;
    language: string;
    created: Date;
    modified: Date;
    _class: string;

    constructor(id: string, email: string, language: string) {
        if(id  != null) {
            this._id = id;
        }
        this.email = email;
        this.language = language;
        this._class = "nl.elstarit.event.service.model.Account";
    }

  public setCreated(date: Date){
        this.created = date;
    }

    public updateModified(){
        this.modified = new Date();
    }
}
