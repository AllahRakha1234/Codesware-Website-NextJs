import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";

export default function App({ Component, pageProps }: AppProps) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  let router = useRouter();

  useEffect(() => {
    // LOADING BAR
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    try {
      if (localStorage.getItem("cart")) {
        let cartData = localStorage.getItem("cart") ?? "{}"; // TO ENSURE THAT JSON.PARSE RECEIVE STRING
        setCart(JSON.parse(cartData));
        saveCart(JSON.parse(cartData));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
    }
  }, [router.query]);

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let total = 0;
    const keys = Object.keys(myCart);
    // CALCULATING SUBTOTAL
    for (let i = 0; i < keys.length; i++) {
      total += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(total);
  };

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = {};
    newCart[itemCode] = { qty: 1, price, name, size, variant };
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkoutpage");
  };

  const logoutFunc = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      setUser({ value: null });
      // setKey(Math.random());
      router.push("/");
    }
  };

  // RENDERING CODE
  return (
    <>
      <LoadingBar
        color="#EC417A"
        progress={progress}
        waitingTime={400}
        height={3}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar
        key={key}
        user={user}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        logoutFunc={logoutFunc}
      />
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        buyNow={buyNow}
        {...pageProps}
      />
      <Footer />
    </>
  );
}
