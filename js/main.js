(function() {
  "use strict";

  // for mainNav
  var toggleButton = document.querySelector(".btn-toggle");
  var mainNav = document.querySelector(".main-nav");
  var userItems = document.querySelector(".user-items");

  initMenuState();

  handleMenu();

  function toggleMenu() {
    toggleButton.classList.toggle("btn-toggle--close");
    mainNav.classList.toggle("main-nav--closed");
    userItems.classList.toggle("user-items--closed");
  }

  function handleMenu() {
    toggleButton.addEventListener("click", function(e) {
      e.preventDefault();
      toggleMenu();
    });
  }

  function initMenuState() {
    toggleMenu();
  }


  // for modal
  var modal = document.querySelector(".modal");
  var modalOpen = document.querySelectorAll(".js-modal-open");
  var modalClose = document.querySelectorAll(".js-modal-close");

  if (modal && modalOpen) {
    handleModal();
  }

  function handleModal() {
    for (var i = 0; i < modalOpen.length; i++) {
      modalOpen[i].addEventListener("click", function(e) {
        e.preventDefault();
        modal.classList.remove("modal--closed");
      });
    }

    for (var i = 0; i < modalClose.length; i++) {
      modalClose[i].addEventListener("click", function(e) {
        e.preventDefault();
        modal.classList.add("modal--closed");
      });
    }
  }

})();
