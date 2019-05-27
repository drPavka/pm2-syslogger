import { launchBus } from 'pm2';
var pmx = require('pmx');
var posix = require('posix');
var conf = pmx.initModule({});
launchBus(function (err, bus) {
    bus.on('log:err', function (data) {
        posix.openlog(data.process.name, { ndelay: true, pid: true }, conf.priority);
        posix.syslog(conf.facility, data.data);
        posix.closelog();
    });
    bus.on('log:out', function (data) {
        posix.openlog(data.process.name, { ndelay: true, pid: true }, 'user');
        posix.syslog('info', data.data);
        posix.closelog();
    });
});
