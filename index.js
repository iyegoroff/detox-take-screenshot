const tempfile = require('tempfile')
const { readFile } = require('fs')
const { promisify } = require('util')
const AndroidDevicePathBuilder = require('detox/src/artifacts/utils/AndroidDevicePathBuilder')

const read = promisify(readFile)

const devicePathBuilder = new AndroidDevicePathBuilder()

const screenshot = async () => {
  const { deviceDriver: { adb, applesimutils: appleSimUtils }, _deviceId: deviceId } = device
  const temp = tempfile('.png')

  if (device.getPlatform() === 'ios') {
    await appleSimUtils.takeScreenshot(deviceId, temp)
  } else {
    const pathToScreenshotOnDevice = devicePathBuilder.buildTemporaryArtifactPath('.png')

    await adb.screencap(deviceId, pathToScreenshotOnDevice)
    await adb.pull(deviceId, pathToScreenshotOnDevice, temp)
    await adb.rm(deviceId, pathToScreenshotOnDevice)
  }

  return read(temp)
}

module.exports = screenshot
