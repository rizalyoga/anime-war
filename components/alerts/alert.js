import Swal from "sweetalert2";
import { newGameTag } from "@/data/gameTags";
import Cookies from "js-cookie";

// Modal for show result of battle
export const resultAlert = (status) => {
  return Swal.fire({
    title: status,
    width: 600,
    padding: "3em",
    color: "#FFF",
    background: `linear-gradient(rgba(4,9,30,0.7), rgba(4,9,30,0.7)), url(/assets/all_star_sweet.jpg)`,
    backdrop: `
    rgba(4,9,30,0.5)
          left top
          no-repeat
        `,
  });
};

// Modal for reset game
export const confirmationtAlert = () => {
  return Swal.fire({
    title: "Are you sure to reset game?",
    color: "#fff",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#224ead",
    confirmButtonText: "Reset",
    background: `linear-gradient(rgba(4,9,30,0.5), rgba(4,9,30,0.5)), url(/assets/all_star_sweet.jpg)`,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      Swal.fire({
        title: "Battle data has been reset",
        background: `linear-gradient(rgba(4,9,30,0.5), rgba(4,9,30,0.5)), url(/assets/all_star_sweet.jpg)`,
        color: "#fff",
      });
    }
  });
};

// Modal for Logout confirmation
export const logoutConfirm = () => {
  return Swal.fire({
    title: "Are you sure to Logout?",
    color: "#fff",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#224ead",
    confirmButtonText: "Log out",
    background: `linear-gradient(rgba(4,9,30,0.5), rgba(4,9,30,0.5)), url(/assets/all_star_sweet.jpg)`,
  }).then((result) => {
    if (result.isConfirmed) {
      Cookies.remove("userAuth");
      localStorage.removeItem("username");
      localStorage.removeItem("nickname");
      localStorage.removeItem("nicknameId");
      window.location.href = "/";
    }
  });
};

// Modal for create game Tag
export const createGameTag = () => {
  Swal.fire({
    title: "Create your game nickname",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Create",
    showLoaderOnConfirm: true,
    preConfirm: (nickname) => {
      const payload = { name: nickname };
      const token = Cookies.get("userAuth");

      newGameTag(payload, token).then((response) => {
        if (response.statusCode == 400) {
          Swal.fire({
            title: `Sorry, ${response.message}`,
          });
        } else {
          localStorage.setItem("nickname", response.name);
          localStorage.setItem("nicknameId", response.id);

          Swal.fire({
            title: `nickname success created`,
          });
        }
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
};
