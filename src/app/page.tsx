"use client";
import SearchForm from "@/components/SearchForm";
import { SearchData } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [serchValue, setSearchValue] = useState<SearchData>({ results: [] });
  const [loading, setLoading] = useState(false);
  const [isEmptyRedults, setIsEmptyRedults] = useState(false);
  console.log(serchValue);

  return (
    <>
      <SearchForm
        setSearchValue={setSearchValue}
        setLoading={setLoading}
        setIsEmptyRedults={setIsEmptyRedults}
      />
      <div className="grid md:grid-cols-3 place-items-center gap-4">
        {serchValue.results.map((photo) => (
          <div key={photo.id} className="shadow-xl rounded-md">
            <Link href={`/photo/${photo.id}`}>
              <Image
                src={photo.urls.regular}
                width={600}
                height={600}
                alt={photo.alt_description}
                className="h-80 object-cover rounded-md"
              />
            </Link>
          </div>
        ))}
      </div>
      {isEmptyRedults && (
        <div className="text-no-results text-base">
          К сожалению, поиск не дал результатов
        </div>
      )}
      {loading && (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
    </>
  );
}
