"use client";
import Card from "@/components/Card";
import Loader from "@/components/Loader";
import SearchForm from "@/components/SearchForm";
import { useMediaQuery } from "@/lib/mediaQuery";
import { SearchData } from "@/lib/types";
import { getPhotos } from "@/lib/unsplash";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [serchValue, setSearchValue] = useState<SearchData>({ results: [] });
  const [loading, setLoading] = useState(false);
  const [isEmptyResults, setIsEmptyResults] = useState(false);
  const [searchingValue, setSearchingValue] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const { ref, inView } = useInView();
  const matches = useMediaQuery(1025);

  useEffect(() => {
    if (inView) {
      setLoading(true);
      getPhotos(searchingValue, serchValue.results.length + 1, matches).then(
        (res) => {
          setSearchValue({ results: [...serchValue.results, ...res.results] });
          setLoading(false);
        }
      );
    }
  }, [inView, searchingValue]);

  return (
    <div
      className={`grid grid-cols-1 max-w-7xl mx-auto items-center ${
        isFirstLoad ? "h-screen" : ""
      }`}
    >
      <SearchForm
        setSearchValue={setSearchValue}
        setLoading={setLoading}
        setIsEmptyResults={setIsEmptyResults}
        setSearchingValue={setSearchingValue}
        matches={matches}
        isFirstLoad={isFirstLoad}
        setIsFirstLoad={setIsFirstLoad}
      />
      {serchValue.results.length !== 0 && (
        <div className="px-4 grid grid-cols-3 place-items-center gap-1 xl:gap-4 lg:grid-cols-6 min-[520px]:grid-cols-5 min-[400px]:grid-cols-4 min-[380px]:grid-cols-3">
          {serchValue.results.map((photo, index) => (
            <Card photo={photo} key={photo.id} index={index} />
          ))}
        </div>
      )}
      {loading && <Loader />}
      {isEmptyResults && (
        <div className="text-no-results text-base px-4 h-screen">
          К сожалению, поиск не дал результатов
        </div>
      )}
      {serchValue.results.length !== 0 && <div ref={ref} />}
    </div>
  );
}
