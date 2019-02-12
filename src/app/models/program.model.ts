export class Program {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static deserialize(program: any): Program {
    return new Program(program._id, program.name);
  }
}
