import Card from "@/components/atoms/card";

const SummaryCard = ({ className }) => {
  return (
    <Card className={className}>
      <div>
        <h1 className="text-sm mb-2">Devices Registered</h1>
      </div>
      <div>
        <div className="text-4xl">9</div>
      </div>
    </Card>
  );
};

export default SummaryCard;
