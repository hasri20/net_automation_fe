import Card from "@/components/atoms/card";
import { RiseOutlined } from "@ant-design/icons";

const SummaryCard = ({ className }) => {
  return (
    <Card className={className}>
      <div>
        <h1 className="text-sm mb-2">Daily Revenue</h1>
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <div className="text-4xl">12.380</div>
          <div className="flex mt-2">
            <div style={{ color: "#009E60" }} className="flex items-center">
              <RiseOutlined />
              <span className="mx-1">+23%</span>
            </div>
            Today
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SummaryCard;
