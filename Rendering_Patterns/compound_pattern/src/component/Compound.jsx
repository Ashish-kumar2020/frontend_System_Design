import { CompoundProvider } from "../context/CompoundContext";
import Content from "./Content";
import { Footer } from "./Footer";
import { Header } from "./Header";
import ResetComponent from "./ResetComponent";


const Compound = ({children}) => {
  return (
    <CompoundProvider>
        {children}
    </CompoundProvider>
  )
}

Compound.Header = Header;
Compound.Content = Content;
Compound.Footer = Footer;
Compound.Reset = ResetComponent;

export default Compound