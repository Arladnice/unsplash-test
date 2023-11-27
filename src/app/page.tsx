"use client";
import Card from "@/components/Card";
import Loader from "@/components/Loader";
import SearchForm from "@/components/SearchForm";
import { SearchData } from "@/lib/types";
import { getPhotos } from "@/lib/unsplash";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [serchValue, setSearchValue] = useState<SearchData>({ results: [] });
  const [loading, setLoading] = useState(false);
  const [isEmptyResults, setIsEmptyResults] = useState(false);
  const [searchingValue, setSearchingValue] = useState("");

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      setLoading(true);
      getPhotos(searchingValue, serchValue.results.length + 1).then((res) => {
        setSearchValue({ results: [...serchValue.results, ...res.results] });
        setLoading(false);
      });
    }
  }, [inView, searchingValue]);
  console.log(serchValue);

  return (
    <>
      <SearchForm
        setSearchValue={setSearchValue}
        setLoading={setLoading}
        setIsEmptyResults={setIsEmptyResults}
        setSearchingValue={setSearchingValue}
      />
      <div className="grid grid-cols-3 place-items-center gap-4 xl:px-0 px-5">
        {serchValue.results.map((photo, index) => (
          <Card photo={photo} key={photo.id} index={index} />
        ))}
      </div>
      {loading && <Loader />}
      {isEmptyResults && (
        <div className="text-no-results text-base xl:px-0 px-5">
          К сожалению, поиск не дал результатов
        </div>
      )}
      {serchValue.results.length !== 0 && <div ref={ref} />}
    </>
  );
}
