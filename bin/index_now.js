const fs = require('fs');
const path = require('path');
const { OnePoint } = require('./main');
let op = new OnePoint();
op.initialize(JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config.json'), 'utf8')));

module.exports = async (req, res) => {
    try {
        let r = await op.handleRaw(req.method, req.url, req.headers, req.body, "now", req.headers['x-real-ip'], '', req.query, req.cookies);
        res.writeHead(r.statusCode, r.headers);
        res.write(r.body);
        res.end();
    } catch (error) {
        console.log(error);
        res.writeHead(500, {});
        res.write("error");
        res.end();
    }
}