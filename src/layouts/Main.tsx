import React from "react";
import { Navbar } from "@/components";
import { Helmet } from "react-helmet-async";

interface IPropsLayout {
  children: React.ReactNode;
  title?: string;
}

const Main = ({ children, title }: IPropsLayout) => {
  return (
    <React.Fragment>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{title ? `${title} | ByteMart` : "ByteMart"}</title>
      </Helmet>
      <Navbar />
      <section>{children}</section>
    </React.Fragment>
  );
};

export default Main;
