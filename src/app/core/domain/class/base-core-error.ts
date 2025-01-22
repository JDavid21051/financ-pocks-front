import {CoreCodeErrosEnum} from '@core/domain/enums/code-errors.enum';

export abstract class BaseCoreError extends Error {
  abstract readonly code: CoreCodeErrosEnum;
  constructor(message: string, cause?: Error) {
    super(message, { cause });
  }
}
