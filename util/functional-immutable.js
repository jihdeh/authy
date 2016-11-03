import {invoker, defaultTo} from "ramda";
import { List, Map } from "immutable";

export const get = invoker(1, "get");
export const getIn = invoker(1, "getIn");
export const set = invoker(2, "set");
export const setIn = invoker(2, "setIn");
export const map = invoker(1, "map");

export const defaultToEmptyList = defaultTo(new List());
export const defaultToEmptyMap = defaultTo(new Map());

