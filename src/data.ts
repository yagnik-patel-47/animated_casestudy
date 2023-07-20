import { useState } from "react"

const useCarsData = () => {
  const [carsData, setCarsData] = useState([
    {
      name: "BMW M4",
      thumbImage: "/cars/m4.webp",
      index: 1,
      images: ["/cars/m4_1.webp", "/cars/m4_2.webp"],
      objectPos: ["80% center", "center 90%"],
      bgColor: "#131313",
    },
    {
      name: "Mercedes AMG GT",
      thumbImage: "/cars/amg.webp",
      index: 2,
      images: ["/cars/amg_1.webp", "/cars/amg_2.webp"],
      objectPos: ["center", "65% center"],
      bgColor: "#2d343e",
    },
    {
      name: "Supra Mk5",
      thumbImage: "/cars/mk5.webp",
      index: 3,
      images: ["/cars/mk5_1.webp", "/cars/mk5_2.webp"],
      objectPos: ["center", "center"],
      bgColor: "#3e1313",
    },
    {
      name: "Subaru WRX",
      thumbImage: "/cars/wrx.webp",
      index: 4,
      images: ["/cars/wrx_1.webp", "/cars/wrx_2.webp"],
      objectPos: ["center", "center"],
      bgColor: "#043134",
    },
    {
      name: "Nissan GTR R34",
      thumbImage: "/cars/r34.webp",
      index: 5,
      images: ["/cars/r34_1.webp", "/cars/r34_2.webp"],
      objectPos: ["center", "center 70%"],
      bgColor: "#13200d",
    },
    {
      name: "Porsche 911 GT3",
      thumbImage: "/cars/gt3.webp",
      index: 6,
      images: ["/cars/gt3_1.webp", "/cars/gt3_2.webp"],
      objectPos: ["center", "center 90%"],
      bgColor: "#002937",
    },
    {
      name: "Ford Mustang GT",
      thumbImage: "/cars/mustang.webp",
      index: 7,
      images: ["/cars/mustang_1.webp", "/cars/mustang_2.webp"],
      objectPos: ["center", "center 80%"],
      bgColor: "#011a0b",
    },
  ])

  const increaseIndex = () => {
    const newData = carsData.map((value) =>
      value.index !== 7
        ? { ...value, index: (value.index += 1) }
        : { ...value, index: (value.index = 1) }
    )
    setCarsData(newData)
  }

  const decreaseIndex = () => {
    const newData = carsData.map((value) =>
      value.index !== 1
        ? { ...value, index: (value.index -= 1) }
        : { ...value, index: (value.index = 7) }
    )
    setCarsData(newData)
  }

  return { carsData, increaseIndex, decreaseIndex, setCarsData }
}

export default useCarsData
