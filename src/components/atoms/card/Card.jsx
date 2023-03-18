const Card = ({ children, className }) => {
  return (
    <div
      className={
        "w-full rounded-xl overflow-hidden bg-white px-6 py-4 " + className
      }
    >
      {children}
    </div>
  );
};

export default Card;
