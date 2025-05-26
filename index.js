require("dotenv").config(".env");

const express = require('express');
const cors = require("cors");
const proxy = require("express-http-proxy");
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const APP_URL = process.env.APP_URL || "http://localhost";
const APP_PORT = process.env.APP_PORT || 9000;
const ADMIN_PORT = process.env.ADMIN_PORT || 9001;
const USER_PORT = process.env.USER_PORT || 9002;
const RECOGNITION_PORT = process.env.RECOGNITION_PORT || 9003;
const DETECTION_PORT = process.env.DETECTION_PORT || 9004;
const READER_PORT = process.env.READER_PORT || 9005;

const isMultipartRequest = function (req) {
    const contentTypeHeader = req.headers['content-type']
    return contentTypeHeader && contentTypeHeader.indexOf('multipart') > -1
}

const proxys = function (host) {
    return function (req, res, next) {
        let reqBodyEncoding
        let reqAsBuffer = false
        let parseReqBody = true

        if (isMultipartRequest(req)) {
            reqAsBuffer = true
            reqBodyEncoding = null
            parseReqBody = false
        }

        return proxy(host, {
            reqAsBuffer,
            reqBodyEncoding,
            parseReqBody
        })(req, res, next)
    }
}

app.use("/admin", proxys(APP_URL + ":" + ADMIN_PORT))
app.use("/user", proxy(APP_URL + ":" + USER_PORT));
app.use("/recognition", proxys(APP_URL + ":" + RECOGNITION_PORT))
app.use("/detection", proxy(APP_URL + ":" + DETECTION_PORT));
app.use("/reader", proxys(APP_URL + ":" + READER_PORT))

app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
});
