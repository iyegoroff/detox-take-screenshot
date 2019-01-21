import tempfile from 'tempfile'
import { readFile } from 'fs'
import { promisify } from 'util'
import AndroidDevicePathBuilder from 'detox/src/artifacts/utils/AndroidDevicePathBuilder'

const read = promisify(readFile)

const devicePathBuilder = new AndroidDevicePathBuilder()

const isIos = () => device._deviceConfig.type.startsWith('ios')

export const screenshot = async () => {
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

export const identifier = (name) => `${isIos() ? 'ios' : 'android'}-${name}`
