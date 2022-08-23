import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * @description Logger service for environment logging.
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export type LogOutput = (
  source: string | undefined,
  level: LogLevel,
  ...objects: any[]
) => void;

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private static level: LogLevel = LogLevel.DEBUG;

  public static debug(...message: any): void {
    LoggerService.writeToLog(LogLevel.DEBUG, ...message);
  }

  public static log(...message: any) {
    LoggerService.writeToLog(LogLevel.INFO, ...message);
  }

  public static warn(...message: any) {
    LoggerService.writeToLog(LogLevel.WARN, ...message);
  }

  public static error(...message: any) {
    LoggerService.writeToLog(LogLevel.ERROR, ...message);
  }

  /**
   * Should write the log?
   */
  private static shouldLog(level: LogLevel): boolean {
    return level >= this.getLogType();
  }

  /**
   * Get Log Type?
   */
  private static getLogType(): LogLevel {
    switch (environment.LOG_LEVEL) {
      case 'DEBUG':
        return LogLevel.DEBUG;
      case 'ERROR':
        return LogLevel.ERROR;
      case 'INFO':
        return LogLevel.INFO;
      default:
        return LogLevel.WARN;
    }
  }

  /**
   * Write logs.
   */
  private static writeToLog(level: LogLevel, ...message: any) {
    if (this.shouldLog(level)) {
      if (level <= LogLevel.INFO) {
        console.log(LoggerService.getLogDate(), ...message);
      } else if (level === LogLevel.ERROR) {
        console.error(LoggerService.getLogDate(), ...message);
      } else if (level === LogLevel.WARN) {
        console.warn(LoggerService.getLogDate(), ...message);
      }
    }
  }

  /**
   * To add the date on logs.
   */
  private static getLogDate(): string {
    const date = new Date();
    return (
      '[' +
      date.getUTCFullYear() +
      '/' +
      (date.getUTCMonth() + 1) +
      '/' +
      date.getUTCDate() +
      ' ' +
      date.getUTCHours() +
      ':' +
      date.getUTCMinutes() +
      ':' +
      date.getUTCSeconds() +
      '.' +
      date.getMilliseconds() +
      ']'
    );
  }
}
