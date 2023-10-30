export const error = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-right",
    color: "#ccc",
    background: "#28272c",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: "error",
    title: message,
  });
};

export const success = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-right",
    color: "#ccc",
    background: "#28272c",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: "success",
    title: message,
  });
};