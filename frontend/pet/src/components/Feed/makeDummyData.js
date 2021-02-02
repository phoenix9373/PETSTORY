import dummy from './boardFindAll.json';

export default function makeDummyData(size) {
  const dummyData = [];
  const tmp1 = dummy.data[0];
  const tmp2 = dummy.data[1];
  let k = 0;
  for (let i = 0; i < size; i += 1) {
    if (i % 10 === 0 && i > 1) {
      k += 1;
    }
    if (i % 2 === 0) {
      dummyData.push({
        ...tmp1,
        boardId: i,
        file: { ...tmp1.file, id: i },
        groupId: k,
      });
    } else {
      dummyData.push({
        ...tmp2,
        boardId: i,
        file: { ...tmp2.file, id: i },
        groupId: k,
      });
    }
  }

  return dummyData;
}
