import { FiTruck } from "react-icons/fi";
import { FaBox } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GiThreeLeaves } from "react-icons/gi";

const Services = () => {
  return (
    <>
      <section className="w-full flex flex-wrap justify-between items-center p-6 text-[#333]">
        <article className="w-1/2 md:w-1/4 h-14 flex items-center justify-center gap-2">
          <FiTruck className="w-8 text-3xl md:text-4xl" />
          <div>
            <h4 className="text-[10px] font-bold md:text-sm">
              EXPRESS SHIPPING
            </h4>
            <p className="text-[9px] md:text-[10px]">24H/48H</p>
          </div>
        </article>
        <article className="w-1/2 md:w-1/4 h-14 flex items-center justify-center gap-2">
          <FaBox className="w-8 text-2xl md:text-4xl" />
          <div>
            <h4 className="text-[10px] font-bold md:text-sm">RETURNS</h4>
            <p className="text-[9px] md:text-[10px]">30 BUSINESS DAYS</p>
          </div>
        </article>
        <article className="w-1/2 md:w-1/4 h-14 flex items-center justify-center gap-2">
          <RiSecurePaymentLine className="w-8 text-3xl md:text-4xl" />
          <div>
            <h4 className="text-[10px] font-bold md:text-sm">
              SECURE PAYMENTS
            </h4>
            <p className="text-[9px] md:text-[10px]">100% PROTECTED</p>
          </div>
        </article>
        <article className="w-1/2 md:w-1/4 h-14 flex items-center justify-center gap-2">
          <GiThreeLeaves className="w-8 text-3xl md:text-4xl" />
          <div>
            <h4 className="text-[10px] font-bold md:text-sm">
              SUSTAINABLE FASHION
            </h4>
            <p className="text-[9px] md:text-[10px]">AND RESPONSIBLE</p>
          </div>
        </article>
      </section>
    </>
  );
};

export default Services;
