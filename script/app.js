if (config.username && config.password) {
  navigation.main(config.username, config.password)
} else {
  navigation.warning()
}
