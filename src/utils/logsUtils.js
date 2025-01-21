// @flow
import { ENVS } from '../enums/app';

function log(...args: mixed[]) {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

function errorLog(...args: mixed[]) {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.error(...args);
  }
}

function warnLog(...args: mixed[]) {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.warn(...args);
  }
}

function debugLog(...args: mixed[]) {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.debug(...args);
  }
}

function traceLog(...args: mixed[]) {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.trace(...args);
  }
}

function tableLog(
  ...args:
    | Record<string, mixed>
    | Array<Record<string, mixed>>
    | Array<Array<mixed>>
) {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.table(args);
  }
}

function infoLog(...args: mixed[]) {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.info(...args);
  }
}

const timeLog = (label: string) => {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.time(label);
  }
};

const timeEndLog = (label: string) => {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.timeEnd(label);
  }
};

export {
  log,
  errorLog,
  warnLog,
  debugLog,
  traceLog,
  tableLog,
  infoLog,
  timeLog,
  timeEndLog,
};
