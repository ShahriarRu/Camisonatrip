import React from "react";
import { useLoading, Puff } from "@agney/react-loading";

const Loader = () => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Puff width="100" style={loaderStyle} />,
  });

  return (
    <section style={sectionStyle} {...containerProps}>
      {indicatorEl}
    </section>
  );
};

const sectionStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
};

const loaderStyle = {
  color: "blue",
  width: "40%",
  position: "fixed",
};

export default Loader;
