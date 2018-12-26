
class Question {
  _id: string;
  title: string;
  description: string;
  date: Date;
  status: string;
  courses: string[];
  owner: string;

  constructor() {
    // if (owner === '') {
    //   throw expect();
    // }
    this.title = '';
    this.description = '';
    this.date = new Date();
    this.status = '';
    this.courses = [];
    this.owner = '';
  }
}

export default Question;
