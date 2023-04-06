const Text = ({ children, className }) => {
  return (
    <div className={className}>
      <span>{children}</span>
    </div>
  );
};

export default Text;
