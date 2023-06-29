const {
  updateSmartThingsDeviceState,
  getDevices,
} = require("../lib/smartthings");

main();

async function main() {
  // bearerToken will be from the mongodb database
  const bearerToken = "699d0a7e-0745-4699-844a-dbd3f1e9149e";

  // GET /smartthings/devices
  // returns array of devices that have switch capability
  const devices = await getDevices(bearerToken);
  console.log(devices);

  // function call to update smartthings outputs for connected integration for POST /integrations/execute
  // outputDevices will be from the mongodb database
  const outputDevices = [
    {
      deviceId: "32f3bea4-8f1a-44e1-3276-1845c3eae0ea",
      state: "off",
    },
  ];
  const promises = [];
  for (const device of outputDevices) {
    promises.push(
      updateSmartThingsDeviceState(bearerToken, device.deviceId, device.state)
    );
  }
  const results = await Promise.all(promises);
  console.log(results);
}
