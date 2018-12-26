export class Upvote {
  count: number;
  upvoters: Set<string>;

  constructor(count: number, upvoters: Set<string>) {
    this.count = count;
    this.upvoters = upvoters;
  }
}
