import { injectable, inject } from 'inversify';
import { FileLoader } from '../common/file-loader';
import { SpecOptions } from './types';
import { SpecFormatter } from './spec-formatter';
import { TYPES } from '../ioc/types';
import { ApiSpec } from '../types';

@injectable()
export class SpecResolver {
  constructor(
    @inject(TYPES.FileLoader) private readonly fileLoader: FileLoader,
    @inject(TYPES.SpecFormatter) private readonly specFormatter: SpecFormatter,
  ) { }

  async resolveSpec(src: string | object, options: SpecOptions = {}): Promise<ApiSpec> {
    if (typeof src === 'string') {
      const spec = await this.fileLoader.load(src);
      return this.specFormatter.formatSpec(spec, src);
    } else {
      return this.specFormatter.formatSpec(src as ApiSpec);
    }
  }
}
