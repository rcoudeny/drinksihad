import pino from 'pino';
import dayjs from 'dayjs';

const log = pino({
    transport: {
        target: 'pino-pretty'
    },
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
},
    pino.destination(`${__dirname}/logger.log`)
);

export default log;