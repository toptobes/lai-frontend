import { ReactNode } from 'react';

export const DUMMY_CREDENTIALS = 'demo-lindauer-ai';

declare const IOActionBrand: unique symbol;
export type IO<Args extends any[], R> = (...args: Args) => R & { [IOActionBrand]: true };

export const io = <Args extends any[], R>(fn: (...args: Args) => R) => fn as IO<[], R>;

io.pure = ((..._) => {}) as IO<[any], void>;

io.once = <R, Args extends any[]>(fn: (...args: Args) => R) => {
  let done = false;
  let result: R;

  return ((...args: Args) => {
    if (done) return result;
    done = true;
    return result = fn(...args);
  }) as IO<Args, R>;
}

export type DTOType<
  T extends (...args: any[]) => Promise<DTO>,
  DTO = T extends (...args: any[]) => Promise<infer R> ? R : never
> = WithProperOptionality<DTO>;

export type WithProperOptionality<DTO> = {
  [K in keyof DTO as K extends `${string}?` ? never : K]-?: DTO[K]
} & {
  [K in keyof DTO as K extends `${string}?` ? K : never]+?: DTO[K]
};

export type Action<A extends { action: string }, T extends A['action']> = A & { action: T };

export type Consumer<T> = (t: T) => void;

export interface Kids {
  children: ReactNode;
}

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

export const mapProp = <O, B, K extends keyof O>(prop: K, fn: (t: O[K]) => B) => (t: O[]) => {
  return t.map(x => ({ ...x, [prop]: fn(x[prop]) }));
}

declare global {
  interface Array<T> {
    keyedGroupBy<K extends Keyable = string>(fn: (obj: T) => K): Map<K, T[]>,
    alistGroupBy<K extends Keyable = string>(fn: (obj: T) => K): [K, T[]][],
    span(pred: (x: T) => boolean): [T[], T[]],
    impureReduce<A>(fn: (acc: A, x: T) => void, init: A): A,
  }
}

Array.prototype.keyedGroupBy = function (fn) {
  return keyedGroupBy(this, fn);
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

export const not = (x: boolean) => !x;

export const noProp = <E extends { stopPropagation: () => void }>(fn: (e: E) => void) => (e: E) => {
  e.stopPropagation();
  fn(e);
};

export const prevDefault = <E extends { preventDefault: () => void }>(fn: (e: E) => void) => (e: E) => {
  e.preventDefault();
  fn(e);
}

export const pass = () => {};

export const localStorageTryGet = <T>(key: string, def: T): T => {
  try {
    return JSON.parse(localStorage.getItem(key)!) ?? def;
  } catch {
    return def;
  }
}

export type Tuple2Obj<Tuple extends any[], Keys extends Keyable[], N extends number = 0, Acc extends object = {}> =
  N extends Tuple['length']
    ? Acc
    : Tuple2Obj<Tuple, Keys, Inc<N>, Acc & { [K in Keys[N]]: Tuple[N] }>;

type Inc<A extends number> = ProveNum<[...MkTuple<A>, any]['length']>;

type ProveNum<A> = A extends number
  ? A
  : never;

type MkTuple<Len extends number, Acc extends any[] = []> = Acc['length'] extends Len
  ? Acc
  : MkTuple<Len, [...Acc, any]>;
