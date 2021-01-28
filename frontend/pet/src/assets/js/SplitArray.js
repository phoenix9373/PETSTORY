export default function splitArray(arr, size) {
  let i = 0;
  let j = 0;
  const arraySize = Math.ceil(arr.length / size);
  const tempArray = [];
  for (i = 0, j = arr.length; i < j; i += arraySize) {
    tempArray.push({ list_id: i, items: [...arr.slice(i, i + arraySize)] });
  }
  console.log(tempArray);
  return tempArray;
}
