export default function (box, fakeElement) {
  let firstSetFakeElement = setInterval(() => {
    if (box.value) {
      if (box.value.offsetWidth != 0) {
        GetFakeCount();
        clearInterval(firstSetFakeElement);
      }
    }
  }, 0);


  if (process.client) window.addEventListener("resize", () => GetFakeCount());

  const isFirstFakeCheck = ref(false);
  const fakeCount = ref(0);
  const count = ref(0);
  const rowCount = ref(0);
  const countOfRows = ref(0);

  function GetFakeCount() {
    let fakeCurrentCount = 0;
    if (fakeElement.value && fakeElement.value.length > 0) {
      fakeCurrentCount = fakeElement.value.length;
    }
    if (box.value) {
      count.value = box.value.children.length - fakeCurrentCount;
      countOfRows.value = Math.floor(box.value.offsetWidth / box.value.children[0].getBoundingClientRect().width);
      rowCount.value = Math.ceil(count.value / countOfRows.value);
      if (rowCount.value > 0 && countOfRows.value > 0 && count.value > 0) {
        fakeCount.value = rowCount.value * countOfRows.value - count.value;
        isFirstFakeCheck.value = true;

        // console.log(box.value.offsetWidth+"   "+box.value.children[0].getBoundingClientRect().width);

      }
    }
  }


  return { isFirstFakeCheck, fakeCount, count, rowCount, countOfRows, GetFakeCount };
}
