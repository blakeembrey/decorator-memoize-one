import { memoizeOne } from "./index";

describe("decorator memoize one", () => {
  it("should memoize function calls", () => {
    class Test {
      i = 0;

      @memoizeOne
      incr() {
        return ++this.i;
      }
    }

    const test = new Test();

    expect(test.incr()).toEqual(1);
    expect(test.incr()).toEqual(1);
    expect(test.incr()).toEqual(1);

    expect(test.i).toEqual(1);
  });

  it("should only cache the last function call", () => {
    class Test {
      static i = 0;

      @memoizeOne
      static incr(_: number) {
        return ++this.i;
      }
    }

    expect(Test.incr(1)).toEqual(1);
    expect(Test.incr(1)).toEqual(1);

    expect(Test.i).toEqual(1);

    expect(Test.incr(2)).toEqual(2);
    expect(Test.incr(2)).toEqual(2);

    expect(Test.i).toEqual(2);
  });
});
