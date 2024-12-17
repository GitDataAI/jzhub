import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, description } = feature;
  return (
    <div className="w-full">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="mb-6 inline-flex items-center justify-center rounded-[4px] text-primary p-2">
          {icon}
        </div>
        <h3 className="mb-4 text-xl font-bold text-black  sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature;
