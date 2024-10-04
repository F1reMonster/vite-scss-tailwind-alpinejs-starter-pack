// ** Imports
// import Alpine from "alpinejs";

// ** Initializing AlpineJs
// window.Alpine = Alpine;
// Alpine.start();

// ** Correct Window Height Issue In Different Screens and Browsers
function appSizeFixing() {
  // Fixing App Height
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
}
if (window !== "undefined") {
  appSizeFixing();
  window.addEventListener("resize", appSizeFixing);
}
