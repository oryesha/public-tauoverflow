export class Upvote {
  private count: number;
  private upvoters: Set<string>;

  constructor(count: number, upvoters: Set<string>) {
    this.count = count;
    this.upvoters = upvoters;
  }
}
