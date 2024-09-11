import React from "react";

function Layout({ children }) {
  return (
    <>
      <header></header>

      <main>{children}</main>

      <aside></aside>

      <footer></footer>
    </>
  );
}

export default Layout;
