import { Ask, AskConfig } from './createInstance'

export default (instance: Ask, options: AskConfig) => {
  const { preset } = options

  if (!preset) {
    return
  }

  preset.forEach((register) => {
    register(instance)
  })
}
