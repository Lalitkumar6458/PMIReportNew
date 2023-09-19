import LatterPadForm1 from "@/Components/Settings/latterPad/LatterPadForm1"
import LatterPadForm2 from "@/Components/Settings/latterPad/LatterPadForm2"
import LatterPadForm3 from "@/Components/Settings/latterPad/LatterPadForm3"
const LatterpadSection = (latterPadNo, latterPad, islaterPadSelected) => {
  if (latterPadNo == 1 && latterPad && islaterPadSelected) {
    return LatterPadForm1();
  } else if (latterPadNo == 2 && latterPad && islaterPadSelected) {
    return LatterPadForm2();
  } else if (latterPadNo == 3 && latterPad && islaterPadSelected)
    return LatterPadForm3();
  else {
    return "";
  }
};
export default LatterpadSection