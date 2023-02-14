import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as Realm from "realm-web";

import Header from "../../components/Header";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import ProductDetail from "../../components/ProductDetail";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [airline, setAirline] = useState();
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const { query } = useRouter();

  useEffect(async () => {
    // add your Realm App Id to the .env.local file
    const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();
    try {
      let dep,dest,oneAirline;
      const user = await app.logIn(credentials);
      const oneProduct = await user.functions.getOneProduct(query.id);
      dep = await user.functions.getAirport(oneProduct.itineraries[0].segments[0].departure.iataCode);
      dest = await user.functions.getAirport(oneProduct.itineraries[0].segments[oneProduct.itineraries[0].segments.length-1].arrival.iataCode);
      oneAirline = await user.functions.getAirline(oneProduct.validatingAirlineCodes[0]);
      setProduct(() => oneProduct);
      setOrigin(() => dep);
      setDestination(() => dest);
      setAirline(() => oneAirline);

    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      {product && airline && destination && origin && (
        <>
          <Head>
            <title>MongoDB E-Commerce Demo</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="bg-white w-full min-h-screen">
            <Header />
            <Container>
              <ProductDetail product={product} airline={airline} origin={origin} destination={destination}/>
            </Container>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
