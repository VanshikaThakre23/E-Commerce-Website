import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";


const tooltipStyle = {
  arrow: true,
  placement: "right",
  slotProps: {
    tooltip: {
      sx: {
        bgcolor: "#2f2f2f",
        fontSize: "14px",
        color: "#ffeffe",
      },
    },
    arrow: {
      sx: {
        color: "#2f2f2f",
      },
    },
  },
};

const ActionIcon = ({ title, Icon, onClick }) => {
  return (
    <Tooltip title={title} {...tooltipStyle}>
      <Button
        onClick={onClick}
        className="min-w-0! p-2! rounded-full! bg-amber-300! hover:bg-gray-200! transition"
      >
        <Icon className="text-lg text-gray-700 hover:text-[#ff5252] transition" />
      </Button>
    </Tooltip>
  );
};

export default ActionIcon;