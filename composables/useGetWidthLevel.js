export default function () {
  const currentWidth = ref("");
  const width_4xl = ref(1920);
  const width_2xl = ref(1440);
  const width_xl = ref(1199.98);
  const width_lg = ref(991.98);
  const width_md = ref(767.98);
  const width_sm = ref(575.98);

  ReGetWidth();
  if (process.client) window.addEventListener("resize", ReGetWidth);

  function ReGetWidth() {
    if (process.client) {
      if (window.innerWidth <= width_sm.value) {
        currentWidth.value = "sm";
      } else if (window.innerWidth <= width_md.value) {
        currentWidth.value = "md";
      } else if (window.innerWidth <= width_lg.value) {
        currentWidth.value = "lg";
      } else if (window.innerWidth <= width_xl.value) {
        currentWidth.value = "xl";
      } else if (window.innerWidth <= width_2xl.value) {
        currentWidth.value = "2xl";
      } else {
        currentWidth.value = "3xl";
      }
    }
  }

  return { currentWidth };
}
