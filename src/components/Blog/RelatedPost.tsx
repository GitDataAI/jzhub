import { Image } from "primereact/image";
import { Link } from "react-router-dom";

const RelatedPost = ({
  image,
  slug,
  title,
  date,
}: {
  image: string;
  slug: string;
  title: string;
  date: string;
}) => {
  return (
    <div className="flex items-center lg:block xl:flex">
      <div className="mr-5 lg:mb-3 xl:mb-0">
        <div className="relative h-[60px] w-[70px] overflow-hidden rounded-[4px] sm:h-[75px] sm:w-[85px]">
          <Image src={image} alt={title} style={{}} />
        </div>
      </div>
      <div className="w-full">
        <h5>
          <Link
            to={slug}
            className="mb-[6px] block text-base font-medium leading-snug text-black hover:text-primary  "
          >
            {title}
          </Link>
        </h5>
        <p className="text-xs font-medium text-body-color">{date}</p>
      </div>
    </div>
  );
};

export default RelatedPost;
