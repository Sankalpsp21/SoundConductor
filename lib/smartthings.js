const getDevices = async (bearerToken) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    `https://api.smartthings.com/v1/devices`,
    requestOptions
  );
  const result = await response.text();
  // get json from result
  const json = JSON.parse(result);
  const { items } = json;
  const devices = [];
  for (const item of items) {
    console.log(item);
    const { deviceId, label, components } = item;

    const mainComponent = components.find((component) => {
      return component.id === "main";
    });
    const mainCapabilities = mainComponent.capabilities;
    // loop through capabilities to find switch
    const switchCapability = mainCapabilities.find((capability) => {
      return capability.id === "switch";
    });

    // check if switch capability is found
    if (switchCapability) {
      devices.push({
        deviceId,
        label,
      });
    }
  }
  return devices;
};

const updateSmartThingsDeviceState = async (bearerToken, deviceId, state) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const raw = JSON.stringify({
    commands: [
      {
        component: "main",
        capability: "switch",
        command: state,
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `https://api.smartthings.com/v1/devices/${deviceId}/commands`,
    requestOptions
  );
  const result = await response.text();
  return result;
};

module.exports = { getDevices, updateSmartThingsDeviceState };
