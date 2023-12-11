"use client";

import { TailSpin } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center mt-40">
      <TailSpin
        height="80"
        width="80"
        color="lightblue"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
