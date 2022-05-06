import Swal from "sweetalert2";

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
      localStorage.removeItem("userAuth");
      localStorage.removeItem("username");
      window.location.href = "/";
    }
  });
};
