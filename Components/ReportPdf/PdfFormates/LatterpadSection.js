import LatterPadForm1 from "@/Components/Settings/latterPad/LatterPadForm1"
import LatterPadForm2 from "@/Components/Settings/latterPad/LatterPadForm2"
import LatterPadForm3 from "@/Components/Settings/latterPad/LatterPadForm3"
const LatterpadSection=(id,latterPad)=>{
    if(id == 1 && latterPad){
return LatterPadForm1()
    }else if(id == 2 && latterPad){
return LatterPadForm2()
    }else{
        return LatterPadForm3()
    }
}
export default LatterpadSection