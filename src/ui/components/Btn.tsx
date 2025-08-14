import { Pressable, StyleSheet, Text } from "react-native";

export function Btn({
  label,
  onPress,
}: Readonly<{ label: string; onPress: () => void }>) {
  return (
    <Pressable onPress={onPress} style={styles.btn}>
      <Text style={styles.btnText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnText: { fontSize: 14 },
});
