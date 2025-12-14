document.addEventListener("DOMContentLoaded", function () {
  const portfolio = document.querySelector(".portfolio");
  const works = document.querySelectorAll(".work");

  works.forEach((work) => {
    work.addEventListener("click", function (e) {
      // Only run on mobile (≤ 600px)
      if (window.innerWidth > 600) return;

      // Don't trigger if clicking on a link
      if (e.target.closest("a")) return;

      // Move clicked work to first position
      if (this !== portfolio.firstElementChild) {
        portfolio.insertBefore(this, portfolio.firstElementChild);
      }
    });
  });
});
