/**
 * @Description: logger singleton
 * @global logger
 */

const logger = window.console;
export { logger };


import myriad from './db/db';

/**
 * @Description: database singleton
 * @global myriad
 */
// only for test
myriad.userdb.login('admin');

export { myriad };


import {NSBClient} from '@module/contract/nsb-client';

const nsb = new NSBClient('127.0.0.1:26657');
nsb.isc = new ISCClient(this);



