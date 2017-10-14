interface RightAction {
  onPress: Function,
  text: string,
}

interface PrefHeaderType {
  title: string,
  onBackPress: Function,
  rightAction: RightAction,
}
