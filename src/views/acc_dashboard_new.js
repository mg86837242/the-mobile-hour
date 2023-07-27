// Automatically close all the other <details> tags after opening a specific <details> tag
document.querySelectorAll('details').forEach((X, _, Y) => {
  X.ontoggle = _ => {
    if (X.open)
      Y.forEach(y => {
        if (y != X) y.open = false;
      });
  };
});
