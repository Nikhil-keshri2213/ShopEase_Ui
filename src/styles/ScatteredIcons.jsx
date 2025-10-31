import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { RiShoppingBag2Line } from "react-icons/ri";
import { IoShirtOutline } from "react-icons/io5";
import { PiShirtFoldedLight } from "react-icons/pi";
import { PiCoatHanger } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { GiClothes, GiAmpleDress, GiTShirt } from "react-icons/gi";
import { TbShoe, TbHanger } from "react-icons/tb";
import { PiDress, PiPants, PiSneaker, PiTShirt, PiHoodie } from "react-icons/pi";
import { LuShirt, LuShoppingBag } from "react-icons/lu";
import { BsHandbag, BsBag, BsTag } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { BiPurchaseTag } from "react-icons/bi";

const ScatteredIcons = () => {
  // Grid-based positioning to ensure even distribution and no overlaps
  // Dividing the page into a grid and placing icons in cells
  const iconPositions = [
    // Row 1 (5% top)
    { Icon: FiShoppingCart, top: 5, left: 8, size: 65, opacity: 0.12, rotation: 25 },
    { Icon: GiClothes, top: 5, left: 25, size: 60, opacity: 0.11, rotation: 15 },
    { Icon: PiDress, top: 5, left: 42, size: 70, opacity: 0.1, rotation: -30 },
    { Icon: MdOutlineShoppingBag, top: 5, left: 58, size: 65, opacity: 0.13, rotation: -20 },
    { Icon: BsHandbag, top: 5, left: 75, size: 60, opacity: 0.12, rotation: -35 },
    { Icon: FaRegStar, top: 5, left: 92, size: 65, opacity: 0.11, rotation: 45 },
    
    // Row 2 (15% top)
    { Icon: IoShirtOutline, top: 15, left: 15, size: 70, opacity: 0.09, rotation: 60 },
    { Icon: PiCoatHanger, top: 15, left: 35, size: 65, opacity: 0.14, rotation: -45 },
    { Icon: TbShoe, top: 15, left: 50, size: 60, opacity: 0.13, rotation: 20 },
    { Icon: GiAmpleDress, top: 15, left: 68, size: 70, opacity: 0.1, rotation: 55 },
    { Icon: PiPants, top: 15, left: 85, size: 65, opacity: 0.12, rotation: -25 },
    
    // Row 3 (25% top)
    { Icon: PiShirtFoldedLight, top: 25, left: 10, size: 65, opacity: 0.14, rotation: -15 },
    { Icon: RiShoppingBag2Line, top: 25, left: 28, size: 70, opacity: 0.1, rotation: 30 },
    { Icon: LuShirt, top: 25, left: 45, size: 60, opacity: 0.09, rotation: -40 },
    { Icon: BsBag, top: 25, left: 62, size: 65, opacity: 0.14, rotation: -50 },
    { Icon: FiShoppingCart, top: 25, left: 78, size: 70, opacity: 0.15, rotation: 40 },
    { Icon: PiTShirt, top: 25, left: 95, size: 60, opacity: 0.1, rotation: -30 },
    
    // Row 4 (35% top)
    { Icon: GiTShirt, top: 35, left: 18, size: 65, opacity: 0.13, rotation: 30 },
    { Icon: PiHoodie, top: 35, left: 38, size: 70, opacity: 0.11, rotation: -60 },
    { Icon: TbHanger, top: 35, left: 55, size: 65, opacity: 0.12, rotation: 25 },
    { Icon: AiOutlineShopping, top: 35, left: 72, size: 60, opacity: 0.09, rotation: 55 },
    { Icon: PiSneaker, top: 35, left: 88, size: 70, opacity: 0.11, rotation: -55 },
    
    // Row 5 (45% top)
    { Icon: BsTag, top: 45, left: 12, size: 55, opacity: 0.08, rotation: 40 },
    { Icon: LuShoppingBag, top: 45, left: 30, size: 65, opacity: 0.11, rotation: -30 },
    { Icon: IoShirtOutline, top: 45, left: 48, size: 60, opacity: 0.07, rotation: 70 },
    { Icon: BiPurchaseTag, top: 45, left: 65, size: 65, opacity: 0.1, rotation: -45 },
    { Icon: PiCoatHanger, top: 45, left: 82, size: 70, opacity: 0.14, rotation: -40 },
    
    // Row 6 (55% top)
    { Icon: FaRegStar, top: 55, left: 8, size: 70, opacity: 0.11, rotation: -25 },
    { Icon: GiClothes, top: 55, left: 25, size: 65, opacity: 0.09, rotation: 50 },
    { Icon: MdOutlineShoppingBag, top: 55, left: 42, size: 70, opacity: 0.08, rotation: -35 },
    { Icon: PiDress, top: 55, left: 58, size: 65, opacity: 0.08, rotation: -45 },
    { Icon: RiShoppingBag2Line, top: 55, left: 75, size: 70, opacity: 0.1, rotation: -60 },
    { Icon: BsHandbag, top: 55, left: 92, size: 65, opacity: 0.11, rotation: -60 },
    
    // Row 7 (65% top)
    { Icon: PiShirtFoldedLight, top: 65, left: 15, size: 70, opacity: 0.12, rotation: 20 },
    { Icon: TbShoe, top: 65, left: 35, size: 60, opacity: 0.08, rotation: 40 },
    { Icon: LuShirt, top: 65, left: 50, size: 65, opacity: 0.08, rotation: 25 },
    { Icon: PiPants, top: 65, left: 68, size: 60, opacity: 0.1, rotation: -30 },
    { Icon: FiShoppingCart, top: 65, left: 85, size: 70, opacity: 0.11, rotation: -55 },
    
    // Row 8 (75% top)
    { Icon: IoShirtOutline, top: 75, left: 10, size: 65, opacity: 0.13, rotation: 55 },
    { Icon: GiAmpleDress, top: 75, left: 28, size: 70, opacity: 0.1, rotation: 55 },
    { Icon: PiTShirt, top: 75, left: 45, size: 60, opacity: 0.1, rotation: -30 },
    { Icon: BsBag, top: 75, left: 62, size: 65, opacity: 0.14, rotation: -50 },
    { Icon: PiHoodie, top: 75, left: 78, size: 70, opacity: 0.11, rotation: -60 },
    { Icon: TbHanger, top: 75, left: 95, size: 65, opacity: 0.12, rotation: 25 },
    
    // Row 9 (85% top)
    { Icon: PiSneaker, top: 85, left: 18, size: 70, opacity: 0.11, rotation: -55 },
    { Icon: LuShoppingBag, top: 85, left: 38, size: 65, opacity: 0.11, rotation: -30 },
    { Icon: FaRegStar, top: 85, left: 55, size: 70, opacity: 0.15, rotation: 35 },
    { Icon: AiOutlineShopping, top: 85, left: 72, size: 60, opacity: 0.09, rotation: 55 },
    { Icon: BiPurchaseTag, top: 85, left: 88, size: 65, opacity: 0.1, rotation: -45 },
    
    // Row 10 (95% top)
    { Icon: GiTShirt, top: 95, left: 12, size: 65, opacity: 0.13, rotation: 30 },
    { Icon: BsTag, top: 95, left: 30, size: 55, opacity: 0.08, rotation: 40 },
    { Icon: PiCoatHanger, top: 95, left: 48, size: 70, opacity: 0.14, rotation: -40 },
    { Icon: MdOutlineShoppingBag, top: 95, left: 65, size: 65, opacity: 0.09, rotation: 65 },
    { Icon: RiShoppingBag2Line, top: 95, left: 82, size: 70, opacity: 0.1, rotation: -60 },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {iconPositions.map((item, index) => (
        <div
          key={index}
          className="absolute text-black"
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            opacity: 0.5-item.opacity,
            transform: `rotate(${item.rotation}deg) translate(-50%, -50%)`,
          }}>
          <item.Icon size={100} />
        </div>
      ))}
    </div>
  );
};

export default ScatteredIcons;