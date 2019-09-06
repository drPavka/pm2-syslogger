import {launchBus} from 'pm2';

const pmx = require('pmx');
const posix = require('posix');
const conf = pmx.initModule({});

launchBus((err: Error, bus: any) => {
    bus.on('log:out', (data: any) => {
        posix.openlog(data.process.name, {ndelay: true, pid: true}, conf.facility);
        posix.syslog(conf.priority, data.data);
        posix.closelog();
    });

    bus.on('log:err', (data: any) => {
        posix.openlog(data.process.name, {ndelay: true, pid: true}, conf['error-facility']);
        posix.syslog(conf['error-priority'], data.data);
        posix.closelog();
    })
});
