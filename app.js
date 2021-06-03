const express = require("express");

const cors = require("cors");
const path = require("path");

const awsIot = require("aws-iot-device-sdk");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/streaming/on", (req, res) => {
    res.send(`Stream On`);

  let device = awsIot.device({
    keyPath: path.resolve(__dirname, "./cert/6054a0e844-private.pem.key"),
    certPath: path.resolve(__dirname, "./cert/6054a0e844-certificate.pem.crt"),
    caPath: path.resolve(__dirname, "./cert/AmazonRootCA1.pem"),
    clientId: 'wirad1',
    host: "a2ekrkl5cjsvir-ats.iot.us-east-2.amazonaws.com",
    // autoResubscribe: true,
  });

  console.log("^^^^^^");

  device.on("connect", function () {
    console.log("work");

    // device.subscribe("channel-test haha");
  });
  device.publish('streaming', JSON.stringify({ message: 'Streaming on hogai' }))
  device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });
});

app.get("/streaming/off", (req, res) => {
    res.send(`Stream Off`);

  let device = awsIot.device({
    keyPath: path.resolve(__dirname, "./cert/6054a0e844-private.pem.key"),
    certPath: path.resolve(__dirname, "./cert/6054a0e844-certificate.pem.crt"),
    caPath: path.resolve(__dirname, "./cert/AmazonRootCA1.pem"),
    clientId: 'wirad1',
    host: "a2ekrkl5cjsvir-ats.iot.us-east-2.amazonaws.com",
    // autoResubscribe: true,
  });

  console.log("^^^^^^");

  device.on("connect", function () {
    console.log("work");

    // device.subscribe("channel-test haha");
  });
  device.publish('streaming', JSON.stringify({ message: 'Streaming off hogai' }))
  device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });
});

app.get("/", (req, res) => {
  res.send(`Server is running on ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`App is Listening on ${PORT}`);
});
