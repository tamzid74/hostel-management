import logo from "../assets/logo/reception_8376147.png";
import { FaFacebook, FaLinkedin, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer p-10 bg-base-200 text-base-content font-roboto">
        <aside>
          <img className="w-20" src={logo} alt="" />
          <p className="font-roboto">
            <span className="text-primary font-bold">HostelHub</span> website co...
            <br />
            Providing reliable hostel life since{" "}
            <span className="text-primary font-bold">1992</span>
          </p>
        </aside>
        <nav>
          <header className="text-primary font-bold text-base">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <header className="text-primary font-bold text-base">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <nav>
          <header className=" text-primary font-bold text-base">
            Contact Information
          </header>
          <p>Head Office: Banani,Dhaka,Bangladesh</p>
          <p>Phone number: +880-1300072001</p>
          <p>Email: info@hostelhub.com</p>
        </nav>
      </footer>
      <div className="flex justify-center text-2xl gap-5 text-primary bg-base-200">
        <FaFacebook className="cursor-pointer" />
        <FaLinkedin className="cursor-pointer" />
        <FaTwitterSquare className="cursor-pointer" />
      </div>
      <footer className="footer footer-center p-4 bg-base-200 text-base-content">
        <aside>
          <p className="font-roboto text-xs md:text-sm ">
            Copyright © 2023 - All right reserved by{" "}
            <span className="text-primary font-bold">HostelHub</span> website co...
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
