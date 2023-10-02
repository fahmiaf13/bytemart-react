import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, incrementQuantity, decrementQuantity, setItemQuantity } from "@/redux/cartSlices";
import { RootState } from "@/redux/store";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";

const Navbar = () => {
  const [isHover, setIsHover] = useState<number | null>(null);

  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    return { totalPrice, totalQuantity };
  };

  const handleMouserOver = (id: number) => {
    setIsHover(id);
  };

  const handleMouseOut = () => {
    setIsHover(null);
  };

  const handleQuantityChange = (itemId: number, quantity: string) => {
    const newQuantity = parseInt(quantity, 10);

    if (!isNaN(newQuantity) && newQuantity >= 0) {
      dispatch(setItemQuantity({ itemId, newQuantity }));
    }
  };

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
          <PopoverContent className="w-96 mr-[3rem]">
            <Card>
              <CardHeader>
                <CardTitle>Cart</CardTitle>
                <CardDescription>List of item</CardDescription>
              </CardHeader>
              <CardContent className="max-h-64 overflow-scroll">
                <div className="flex flex-col gap-3">
                  {cart.map((item) => (
                    <Card key={item.id} className="flex items-center p-3 gap-2 relative">
                      <button onClick={() => dispatch(removeItem(item.id))} onMouseOver={() => handleMouserOver(item.id)} onMouseOut={handleMouseOut} className="absolute top-3 right-3">
                        <Icon icon={isHover === item.id ? "ri:close-circle-fill" : "ri:close-circle-line"} width={18} />
                      </button>
                      <img className="w-14 h-14" src={item.images} />
                      <div className="block pr-6">
                        <div className="font-bold">{item.title}</div>
                        <div>{item.price}</div>
                        <div className="flex items-center">
                          <button onClick={() => dispatch(decrementQuantity(item.id))}>
                            <Icon icon="mdi:minus-box" width={24} />
                          </button>
                          <Input type="number" className="w-1/4 h-1 focus-visible:ring-0 rounded-sm" onChange={(e) => handleQuantityChange(item.id, e.target.value)} value={item.quantity} />
                          <button onClick={() => dispatch(incrementQuantity(item.id))}>
                            <Icon icon="mdi:plus-box" width={24} />
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="mt-5 block">
                <div className="flex flex-col">
                  <div>Total Price: {getTotal().totalPrice}</div>
                  <div>Total Item: {getTotal().totalQuantity}</div>
                </div>
                <Button className="w-full bg-red-500 border border-red-500 hover:bg-transparent hover:border-red-500 hover:text-red-500">Purchase</Button>
              </CardFooter>
            </Card>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;
