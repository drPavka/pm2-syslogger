"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pm2_1 = require("pm2");
var pmx = require('pmx');
var posix = require('posix');
var conf = pmx.initModule({});
pm2_1.launchBus(function (err, bus) {
    bus.on('log:out', function (data) {
        posix.openlog(data.process.name, { ndelay: true, pid: true }, conf.priority);
        posix.syslog(conf.facility, data.data);
        posix.closelog();
    });
    bus.on('log:err', function (data) {
        posix.openlog(data.process.name, { ndelay: true, pid: true }, conf['error-priority']);
        posix.syslog(conf['error-facility'], data.data);
        posix.closelog();
    });
});
