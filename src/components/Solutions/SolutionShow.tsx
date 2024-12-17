import React from "react";

interface SolutionsData {
  image: string;
  title: string;
  description: string;
}

interface SolutionsShowProps {
  data: SolutionsData[];
  col: number;
  heading: string;
  subheading: string;
}

const SolutionShow: React.FC<SolutionsShowProps> = ({
  data,
  col,
  heading,
  subheading,
}) => {
  const gridColsClass = `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${Math.min(
    col,
    3
  )} xl:grid-cols-${col}`;

  return (
    <section className=" px-20 pt-24">
      <div className="container">
        <h2 className="text-center text-3xl font-bold mt-10 ">{heading}</h2>
        <p className="text-center text-gray-600 mt-2 /70">{subheading}</p>
        <div className={`${gridColsClass} gap-10 mt-16`}>
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white  rounded-2xl shadow-lg hover:shadow-primary transition-transform duration-300 transform hover:scale-105 overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold ">{item.title}</h3>
                <p className="text-gray-600 mt-2 /70">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionShow;
