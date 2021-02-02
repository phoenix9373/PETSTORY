export default function splitArray(arr) {
  let i = 0;
  let j = 0;
  const tempArray1 = [];
  const tempArray2 = [];
  const tempArray3 = [];
  const tempArray4 = [];
  for (i = 0, j = arr.length; i < j; i += 1) {
    switch (i % 4) {
      case 0:
        tempArray1.push(arr[i]);
        break;
      case 1:
        tempArray2.push(arr[i]);
        break;
      case 2:
        tempArray3.push(arr[i]);
        break;
      default:
        tempArray4.push(arr[i]);
    }
  }
  return [
    { id: 1, array: tempArray1 },
    { id: 2, array: tempArray2 },
    { id: 3, array: tempArray3 },
    { id: 4, array: tempArray4 },
  ];
}
