export default function handler(req, res) {
  const pincodes = [123456, 654321, 987654, 456789];
  res.status(200).json(pincodes);
}
