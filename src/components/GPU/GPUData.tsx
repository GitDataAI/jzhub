interface GPUItem {
  name: string;
  minPrice: number;
  medPrice: number;
  maxPrice: number;
}

function GPUData(): GPUItem[] {
  return [
    {
      name: "RTX 6000ADA",
      minPrice: 0.8,
      medPrice: 0.83,
      maxPrice: 0.97,
    },
    {
      name: "A100 SXM4",
      minPrice: 0.6,
      medPrice: 1.47,
      maxPrice: 1.75,
    },
    {
      name: "H100 SXM",
      minPrice: 2.13,
      medPrice: 2.47,
      maxPrice: 2.54,
    },
    {
      name: "H100 NVL",
      minPrice: 2.67,
      medPrice: 2.8,
      maxPrice: 3.67,
    },
    {
      name: "RTX 3070",
      minPrice: 0.12,
      medPrice: 0.12,
      maxPrice: 0.12,
    },
    {
      name: "A40",
      minPrice: 0.67,
      medPrice: 0.67,
      maxPrice: 0.67,
    },
    {
      name: "A100 PCIE",
      minPrice: 0.81,
      medPrice: 0.82,
      maxPrice: 0.82,
    },
    {
      name: "RTX A6000",
      minPrice: 0.4,
      medPrice: 0.45,
      maxPrice: 0.65,
    },
    {
      name: "RTX 6000ADA",
      minPrice: 0.8,
      medPrice: 0.83,
      maxPrice: 0.97,
    },
    {
      name: "A100 SXM4",
      minPrice: 0.6,
      medPrice: 1.47,
      maxPrice: 1.75,
    },
    {
      name: "H100 SXM",
      minPrice: 2.13,
      medPrice: 2.47,
      maxPrice: 2.54,
    },
    {
      name: "H100 NVL",
      minPrice: 2.67,
      medPrice: 2.8,
      maxPrice: 3.67,
    },
    {
      name: "RTX 3070",
      minPrice: 0.12,
      medPrice: 0.12,
      maxPrice: 0.12,
    },
    {
      name: "A40",
      minPrice: 0.67,
      medPrice: 0.67,
      maxPrice: 0.67,
    },
    {
      name: "A100 PCIE",
      minPrice: 0.81,
      medPrice: 0.82,
      maxPrice: 0.82,
    },
    {
      name: "RTX A6000",
      minPrice: 0.4,
      medPrice: 0.45,
      maxPrice: 0.65,
    },
  ];
}
export default GPUData;
