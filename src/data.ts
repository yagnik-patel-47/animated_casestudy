import { useState } from "react";

const useCarsData = () => {
  const [carsData, setCarsData] = useState([
    {
      name: "BMW M4 Coupé",
      thumbImage: "/cars/m4.webp",
      index: 1,
      images: ["/cars/m4_1.webp", "/cars/m4_2.webp"],
      bgColor: "#131313",
    },
    {
      name: "AMG GT Coupé",
      thumbImage: "/cars/amg.webp",
      index: 2,
      images: ["/cars/amg_1.webp", "/cars/amg_2.webp"],
      bgColor: "#2d343e",
    },
    {
      name: "Supra Mk5",
      thumbImage: "/cars/mk5.webp",
      index: 3,
      images: ["/cars/mk5_1.webp", "/cars/mk5_2.webp"],
      bgColor: "#3e1313",
    },
    {
      name: "Skyline R34",
      thumbImage: "/cars/r34.webp",
      index: 4,
      images: ["/cars/r34_1.webp", "/cars/r34_2.webp"],
      bgColor: "#13200d",
    },
    {
      name: "Subaru WRX",
      thumbImage: "/cars/wrx.webp",
      index: 5,
      images: ["/cars/wrx_1.webp", "/cars/wrx_2.webp"],
      bgColor: "#043134",
    },
    {
      name: "Mustang GT",
      thumbImage: "/cars/mustang.webp",
      index: 6,
      images: ["/cars/mustang_1.webp", "/cars/mustang_2.webp"],
      bgColor: "#011a0b",
    },
  ]);

  const increaseIndex = () => {
    const newData = carsData.map((value) =>
      value.index !== 6
        ? { ...value, index: (value.index += 1) }
        : { ...value, index: (value.index = 1) }
    );
    setCarsData(newData);
  };

  const decreaseIndex = () => {
    const newData = carsData.map((value) =>
      value.index !== 1
        ? { ...value, index: (value.index -= 1) }
        : { ...value, index: (value.index = 6) }
    );
    setCarsData(newData);
  };

  return { carsData, increaseIndex, decreaseIndex, setCarsData };
};

export default useCarsData;
