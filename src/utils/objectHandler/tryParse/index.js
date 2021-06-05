export default function tryParse(v) {
  try {
    return JSON.parse(v);
  } catch {
    return v;
  }
}
