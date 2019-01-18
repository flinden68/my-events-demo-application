export class Account {
    private _id: string;
    private email: string;
    private language: string;
    private created: Date;
    private modified: Date;
    private _class: string;

    constructor(id: string, email: string, language: string) {
        if(id  != null) {
            this._id = id;
        }
        this.email = email;
        this.language = language;
        this._class = "nl.elstarit.event.service.model.Account";
    }

    public getId(){
      return this._id;
    }

  public getEmail(){
    return this.email;
  }


  public setCreated(date: Date){
        this.created = date;
    }

    public updateModified(){
        this.modified = new Date();
    }
}
