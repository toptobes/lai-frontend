export type Consumer<T> = (t: T) => void;

export type AnyFn = (...args: any) => any

export type ReturnConst<Fn extends AnyFn> = (...args: Parameters<Fn>) => () => ReturnType<Fn>;

export const mkReturnConst = <Fn extends AnyFn>(fn: Fn): ReturnConst<Fn> =>
  (...args: Parameters<Fn>) =>
    () => fn(...args)

export type UseStateProps<T, Value extends string, Setter extends string = `set${Capitalize<Value>}`> = {
  [K in Value | Setter]: K extends Value ? T : Consumer<T>;
};

type Keyable = string | number | symbol;

export const keyedGroupBy = <T, K extends Keyable = string>(xs: T[], selector: (t: T) => K): Record<K, T[]> => {
  const acc = {} as Record<K, T[]>;
  const mkOrGet = (key: K) => (acc[key] ?? (acc[key] = []))

  for (let i = 0; i < xs.length; i++) {
    mkOrGet(selector(xs[i])).push(xs[i]);
  }
  return acc;
}

export const listedGroupBy = <T, K extends Keyable = string>(xs: T[], selector: (t: T) => K): [string, T[]][] => {
  return Object.entries(keyedGroupBy(xs, selector));
}

export const takeWhile = <T>(xs: T[], pred: (x: T) => boolean): T[] => {
  const acc = [];
  for (let i = 0; i < xs.length && pred(xs[i]); i++) {
    acc.push(xs[i]);
  }
  return acc;
}

export const span = <T>(xs: T[], pred: (x: T) => boolean): [T[], T[]] => {
  const init = [];
  let i = 0;
  for (; i < xs.length && pred(xs[i]); i++) {
    init.push(xs[i]);
  }
  return [init, xs.slice(i)];
}

export const second = <A, X, Y>([a, x]: [A, X], fn: (a: X) => Y) => {
  return [a, fn(x)];
}

declare global {
  interface Array<T> {
    keyedGroupBy<K extends Keyable = string>(fn: (obj: T) => K): Record<K, T[]>,
    listedGroupBy<K extends Keyable = string>(fn: (obj: T) => K): [string, T[]][],
    takeWhile(pred: (x: T) => boolean): T[],
    span(pred: (x: T) => boolean): [T[], T[]],
    second<Y>(fn: (a: T) => Y): [T, Y],
  }
}

Array.prototype.keyedGroupBy = function (fn) {
  return keyedGroupBy(this, fn);
}

Array.prototype.listedGroupBy = function (fn) {
  return listedGroupBy(this, fn);
}

Array.prototype.takeWhile = function (fn) {
  return takeWhile(this, fn);
}

Array.prototype.span = function (fn) {
  return span(this, fn);
}

export const dimap = <A, X>(pre: (x: X) => A) => <Y, B>(post: (y: Y) => B) => (fn: (a: A) => Y) => (x: X) => {
  return post(fn(pre(x)));
}

export const flip = <A, B, C>(fn: (a: A, b: B) => C) => (b: B, a: A) => {
  return fn(a, b);
}

export const snd = <A, B>(xs: [A, B]) => xs[1];
