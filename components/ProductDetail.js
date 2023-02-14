import React from "react";
import Image from "next/image";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/outline";

const ProductDetail = ({ product, airline, origin, destination }) => {
  console.log(product, airline, origin, destination);
  const notEmptySegments = product.itineraries && product.itineraries[0].segments;
  let raw_duration = product.itineraries[0].duration
  let arr = raw_duration.match(/\d+/g)
  let duration = `${arr[0]}h${arr[1]}min`;
  return (
    <div className="md:flex md:items-center">
      <div className="w-full h-64 md:w-1/2 lg:h-96 relative">
        <Image
          src="/images/flight.jpg"
          layout="fill"
          objectFit="cover"
          className="absolute z-0 rounded"
        />
      </div>
      <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
        <h3 className="text-gray-700 uppercase text-lg">{origin.airport_name} - {destination.airport_name}</h3>
        <ul>
          <li className="text-gray-500 mt-3">duration : {duration}</li>
          <li className="text-gray-500 mt-3">airline : {airline.name}</li>
          <li className="text-gray-500 mt-3">€ {product.price.total} | {product.numberOfBookableSeats} remaining seats</li>
        </ul>
        <hr className="my-3" />
        <div className="mt-2">
          <label className="text-gray-700 text-sm" htmlFor="count">
            Count:
          </label>
          <div className="flex items-center mt-1">
            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
              <PlusCircleIcon className="w-5 h-5" />
            </button>
            <span className="text-gray-700 text-lg mx-2">1</span>
            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
              <MinusCircleIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center mt-6">
          <button className="px-8 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
