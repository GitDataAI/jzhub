import featuresData from "./featuresData";
const Features = () => {
  const features = featuresData();

  return (
    <>
      <section id="features" className="pt-24">
        <div className="container">
          <div className="p-2 rounded border border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-3 md:border-b border-gray-300">
              {features.map((item, index) => (
                <div
                  key={item.id}
                  className={`w-full p-4 border-gray-300 border-b md:border-b-0 ${
                    index < features.length - 1 && (index + 1) % 3 !== 0
                      ? "md:border-r"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 text-sm">
                    {item.icon}
                    {item.title}
                  </div>
                  <p className="text-[13px] text-body-color">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-2 rounded-[4px]">
              <img
                src="images/home/RoboticArm.png"
                className="w-full h-auto rounded-[4px]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
