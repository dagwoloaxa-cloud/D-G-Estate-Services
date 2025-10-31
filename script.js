// === Smooth Auto-Slider ===
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  let index = 0;

  function changeSlide() {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    index = (index + 1) % slides.length;
  }

  changeSlide(); // show first slide
  setInterval(changeSlide, 4000); // change every 4s
});
