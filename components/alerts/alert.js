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
    background: `linear-gradient(rgba(4,9,30,0.7), rgba(4,9,30,0.7)), url(/assets/all_star_sweet.webp)`,
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
    background: `linear-gradient(rgba(4,9,30,0.5), rgba(4,9,30,0.5)), url(/assets/all_star_sweet.webp)`,
  }).then((result) => {
    if (result.isConfirmed) {
      const tagname = localStorage.getItem("nickname");
      localStorage.removeItem(tagname);

      Swal.fire({
        title: "Battle data has been reset",
        background: `linear-gradient(rgba(4,9,30,0.5), rgba(4,9,30,0.5)), url(/assets/all_star_sweet.webp)`,
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
    background: `linear-gradient(rgba(4,9,30,0.5), rgba(4,9,30,0.5)), url(/assets/all_star_sweet.webp)`,
  }).then((result) => {
    if (result.isConfirmed) {
      Cookies.remove("userAuth");
      Cookies.remove("username");
      localStorage.removeItem("nickname");
      localStorage.removeItem("nicknameId");
      window.location.href = "/";
    }
  });
};

// Modal for create game Tag
export const createGameTag = () => {
  Swal.fire({
    icon: "warning",
    title: "Create your game Gametag",
    text: "If the gametag is already available and you create a new gametag, then all battle data will be removed from memory",
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
            icon: "error",
            title: `Oops, Sorry gametag gagal dibuat, ${response.message}`,
          });
        } else {
          const tagname = localStorage.getItem("nickname");
          localStorage.removeItem(tagname);

          localStorage.setItem("nickname", response.name);
          localStorage.setItem("nicknameId", response.id);
          location.reload();

          Swal.fire({
            title: `tagname success created`,
          });
        }
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
};
