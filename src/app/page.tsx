"use client";
import Loader from "@/components/Loader";
import SearchForm from "@/components/SearchForm";
import { SearchData } from "@/lib/types";
import { getPhotos } from "@/lib/unsplash";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [serchValue, setSearchValue] = useState<SearchData>({ results: [] });
  const [loading, setLoading] = useState(false);
  const [isEmptyRedults, setIsEmptyRedults] = useState(false);
  const [searchingValue, setSearchingValue] = useState("");

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      getPhotos(searchingValue, serchValue.results.length + 1).then((res) => {
        setSearchValue({ results: [...serchValue.results, ...res.results] });
      });
    }
  }, [inView, searchingValue, serchValue.results]);

  return (
    <>
      <SearchForm
        setSearchValue={setSearchValue}
        setLoading={setLoading}
        setIsEmptyRedults={setIsEmptyRedults}
        setSearchingValue={setSearchingValue}
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
      {loading && <Loader />}
      {serchValue.results.length !== 0 && <div ref={ref} />}
    </>
  );
}
