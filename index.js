const tempfile = require('tempfile')
const { readFile } = require('fs')
const { promisify } = require('util')
const AndroidDevicePathBuilder = require('detox/src/artifacts/utils/AndroidDevicePathBuilder')

const read = promisify(readFile)

const devicePathBuilder = new AndroidDevicePathBuilder()

const isIos = () => device._deviceConfig.type.startsWith('ios')

const screenshot = async () => {
  const { deviceDriver: { adb, _applesimutils: appleSimUtils }, _deviceId: deviceId } = device
  const temp = tempfile('.png')

  if (isIos()) {
    await appleSimUtils.takeScreenshot(deviceId, temp)
  } else {
    const pathToScreenshotOnDevice = devicePathBuilder.buildTemporaryArtifactPath('.png')

    await adb.screencap(deviceId, pathToScreenshotOnDevice)
    await adb.pull(deviceId, pathToScreenshotOnDevice, temp)
    await adb.rm(deviceId, pathToScreenshotOnDevice)
  }

  return read(temp)
}

const identifier = (name) => `${isIos() ? 'ios' : 'android'}-${name}`

module.exports = { screenshot, identifier }
