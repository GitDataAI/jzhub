const SectionTitle = ({
  title,
  paragraph,
  width = "700px",
  center,
  mb = "100px",
}: {
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
}) => {
  return (
    <>
      <div
        className={`w-full ${center ? "mx-auto text-center" : ""}`}
        style={{ marginBottom: mb }}
      >
        <h2 className="mb-4 text-2xl font-bold !leading-tight text-center lg:text-left text-primary ">
          {title}
        </h2>
        <p className="text-md !leading-relaxed text-body-color">{paragraph}</p>
      </div>
    </>
  );
};

export default SectionTitle;
