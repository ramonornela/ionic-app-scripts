import { BuildContext } from './interfaces';
import { cleancss } from './cleancss';
import { generateContext, Logger } from './util';
import { uglifyjs } from './uglifyjs';


export function compress(context?: BuildContext) {
  context = generateContext(context);

  const logger = new Logger('compress');

  // both can run at the same time
  const promises = [
    cleancss(context),
    uglifyjs(context)
  ];

  return Promise.all(promises).then(() => {
    return logger.finish();
  }).catch(reason => {
    return logger.fail(reason);
  });
}
