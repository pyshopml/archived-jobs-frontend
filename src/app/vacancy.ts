export class Vacancy {
  public id: number;
  public title: string;
  public description: string;
  public date: string;
  public dateOfEditing: string;

  constructor(vacancy) {
    this.id = vacancy.id;
    this.title = vacancy.title;
    this.description = vacancy.description;
    this.date = this.dateToString(new Date());
    this.dateOfEditing = this.dateToString(new Date());
  }

  private dateToString(dateObj: Date): string {
    // returns date as string dd.mm.yyyy
    let date: any = dateObj.getDate();
    let month: any = dateObj.getMonth() + 1;
    let year: any = dateObj.getFullYear();
    if (date < 10) {
      date = '0' + date;
    }
    if (month < 10) {
      month = '0' + month;
    }
    return `${date}.${month}.${year}`;
  }
}
export interface INewVacancy {
  id: number;
  title: string;
  description: string;
}
