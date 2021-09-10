export class Driver {
    driverId:string;
    permanentNumber:string;
    code:string;
    givenName:string;
    familyName:string;
    dateOfBirth:string;
    nationality:string;

    constructor(
        driverID:string,
        permanentNumber:string,
        code:string,
        givenName:string,
        familyName:string,
        dateOfBirth:string,
        nationality:string
    ) {
        this.driverId = driverID
        this.permanentNumber = permanentNumber
        this.code = code
        this.givenName = givenName
        this.familyName = familyName
        this.dateOfBirth = dateOfBirth
        this.nationality = nationality
    }

    getDriverName() {
        return this.givenName + " " + this.familyName
    }
}