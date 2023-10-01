import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  return (
    <nav className="fixed top-0 left-0 right-0 bg-red-500 py-5">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 text-white">
          <Icon width={28} icon="fontisto:shopping-bag" />
          <Link to="/">
            <div className="font-blinker font-bold text-2xl">Byte Mart</div>
          </Link>
        </div>
        <Popover>
          <PopoverTrigger className="flex items-center gap-1 bg-white py-2 px-3 rounded-md relative">
            <div className="absolute -top-2 -right-2 text-xs flex justify-center items-center bg-yellow-300 w-5 h-5 rounded-full">
              <div>{cart.length}</div>
            </div>
            <Icon icon="uil:cart" width={18} />
          </PopoverTrigger>
          <PopoverContent>
            <Card>
              <CardHeader>
                <CardTitle>Cart</CardTitle>
                <CardDescription>List of item</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;
