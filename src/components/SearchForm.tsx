"use client";
import { SearchData } from "@/lib/types";
import { getPhotos } from "@/lib/unsplash";
import Image from "next/image";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import removeIcon from "../public/icons/remove.svg";

interface ISearchFormProps {
  setSearchValue: Dispatch<SetStateAction<SearchData>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsEmptyRedults: Dispatch<SetStateAction<boolean>>;
}

const SearchForm: FC<ISearchFormProps> = ({
  setSearchValue,
  setLoading,
  setIsEmptyRedults,
}) => {
  const searchInput = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchInput.current) {
      setSearchValue({ results: [] });
      setLoading(true);
      setIsEmptyRedults(false);
      const searchValue = searchInput.current.value;
      const response = await getPhotos(searchValue);
      const photos = (await response.json()) as SearchData;
      if (photos.results.length === 0) {
        setIsEmptyRedults(true);
      } else {
        setIsEmptyRedults(false);
      }
      setSearchValue(photos);
      setLoading(false);
    }
  };

  useEffect(() => {
    setInputValue(searchInput.current?.value || "");
  }, [searchInput]);

  return (
    <form
      className="flex justify-center sm:justify-start py-5"
      onSubmit={handleSearch}
    >
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          placeholder="Телефоны, яблоки, груши..."
          className="py-3 px-2 mr-2 w-[420px] h-[48px] ps-9 rounded-xl bg-input-gray transition-colors focus:bg-input-gray-hover focus:outline-none"
          ref={searchInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && (
          <div
            className="absolute inset-y-0 end-4 flex items-center cursor-pointer"
            onClick={() => setInputValue("")}
          >
            <Image
              className=""
              src={removeIcon}
              width={24}
              height={24}
              alt="remove icon"
            />
          </div>
        )}
      </div>
      <button className="px-4 py-3 bg-button-red rounded-xl text-white hover:bg-button-red-hover transition-colors">
        Искать
      </button>
    </form>
  );
};

export default SearchForm;
