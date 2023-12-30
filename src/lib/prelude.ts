export const DUMMY_CREDENTIALS = '';

export type DTOType<T extends (...args: any[]) => Promise<R>, R = T extends (...args: any[]) => Promise<infer R> ? R : never> = Required<R>;

type Keyable = string | number | symbol;

const getOrMk = <K, V>(map: Map<K, V>, key: K, def: V) => map.get(key) ?? map.set(key, def).get(key)!;

export const keyedGroupBy = <T, K extends Keyable = string>(xs: T[], selector: (t: T) => K): Map<K, T[]> => {
  return xs.impureReduce((acc, x) => {
    getOrMk(acc, selector(x), []).push(x);
  }, new Map());
}

export const alistGroupBy = <T, K extends Keyable = string>(xs: T[], selector: (t: T) => K): [K, T[]][] => {
  return Array.from(keyedGroupBy(xs, selector));
}

export const span = <T>(xs: T[], pred: (x: T) => boolean): [T[], T[]] => {
  const init = [];
  let i = 0;
  for (; i < xs.length && pred(xs[i]); i++) {
    init.push(xs[i]);
  }
  return [init, xs.slice(i)];
}

export const impureReduce = <T, A>(xs: T[], fn: (acc: A, x: T) => void, init: A): A => {
  for (let i = 0; i < xs.length; i++) {
    fn(init, xs[i]);
  }
  return init;
}

declare global {
  interface Array<T> {
    alistGroupBy<K extends Keyable = string>(fn: (obj: T) => K): [K, T[]][],
    span(pred: (x: T) => boolean): [T[], T[]],
    impureReduce<A>(fn: (acc: A, x: T) => void, init: A): A,
  }
}

Array.prototype.alistGroupBy = function (fn) {
  return alistGroupBy(this, fn);
}

Array.prototype.span = function (fn) {
  return span(this, fn);
}

Array.prototype.impureReduce = function (fn, init) {
  return impureReduce(this, fn, init);
}

export const dimap = <A, X>(pre: (x: X) => A) => <Y, B>(post: (y: Y) => B) => (fn: (a: A) => Y) => (x: X) => {
  return post(fn(pre(x)));
}

export const flip = <A, B, C>(fn: (a: A, b: B) => C) => (b: B, a: A) => {
  return fn(a, b);
}

export const snd = <A, B>(xs: [A, B]) => xs[1];

export const fakeUUIDv4 = () => "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
  // @ts-ignore
  (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
);

export const after = <T>(ms: number, fn: () => T) => () => new Promise<T>(resolve => setTimeout(() => resolve(fn()), ms));

export const id = <T>(x: T) => x;
