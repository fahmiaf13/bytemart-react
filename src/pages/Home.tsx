import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addToCart } from "@/redux/cartSlices";
import { Icon } from "@iconify/react";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";

type Products = {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
};

const Home = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/products?offset=0&limit=12");
      setProducts(response.data);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <React.Fragment>
      <section className="h-screen">
        <div className="flex flex-col justify-center items-center container mx-auto h-full w-3/4 text-center">
          <div className="font-blinker font-extrabold text-6xl text-red-500">Welcome to ByteMart</div>
          <div className="text-2xl font-blinker text-red-500 font-bold">Your Ultimate Online Marketplace!</div>
          <div>
            At ByteMart, we understand your passion for discovering the latest and greatest products. We are your one-stop destination for a diverse range of items, from gadgets and electronics to fashion, home decor, and everything in
            between. With our extensive product collection, we are committed to bringing innovation right to your fingertips.
          </div>
        </div>
      </section>
      <section>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="mb-10 font-extrabold text-2xl">Our product</div>
          <div className="flex justify-center w-8/12 flex-wrap gap-5">
            {isLoading ? (
              <div className="flex flex-col gap-3 w-64">
                <Skeleton className="w-full h-64 rounded-md" />
                <div className="w-full space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ) : (
              products.map((product) => (
                <Card key={product.id} className="w-64 h-96 p-5">
                  <div className="flex flex-col h-full">
                    <div className="w-full h-80 overflow-hidden">
                      <img src={product.images[0]} alt="product image" className="object-cover w-full h-full rounded-md object-center" />
                    </div>
                    <div className="flex flex-col justify-between h-full">
                      <div className="flex flex-col">
                        <div className="font-extrabold text-lg">{product.title}</div>
                        <div>{product.price}</div>
                      </div>
                      <Button
                        onClick={() => dispatch(addToCart({ id: product.id, images: product.images[0], title: product.title, price: product.price }))}
                        className="w-full hover:bg-transparent bg-red-500 border-red-500 hover:text-red-500 border hover:border-red-500 flex items-center gap-1 "
                      >
                        <Icon icon="ion:bag-add-outline" width={18} /> Add to cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
