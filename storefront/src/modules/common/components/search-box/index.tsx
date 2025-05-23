// src/modules/common/components/search-overlay/search-box.tsx
"use client";

import React from "react";
import SearchIcon from "@modules/common/icons/search-icon";
import { useTranslation } from "react-i18next";
import { IoCloseOutline } from "react-icons/io5";

export type SearchProps = {
  className?: string;
  onSubmit: (e: React.SyntheticEvent) => void;
  onClear: (e: React.SyntheticEvent) => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
};

const SearchBox = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, onSubmit, onClear, ...rest }, ref) => {
    const { t } = useTranslation("forms");

    return (
      <form
        className="relative ltr:pr-12 rtl:pl-12 ltr:md:pr-14 rtl:md:pl-14 bg-white overflow-hidden rounded-md w-full"
        noValidate
        role="search"
        onSubmit={onSubmit}
      >
        <label htmlFor="search" className="flex items-center py-0.5">
          <span className="w-12 md:w-14 h-full flex flex-shrink-0 justify-center items-center cursor-pointer focus:outline-none">
            <SearchIcon className="w-4 h-4 text-heading" />
          </span>
          <input
            id="search"
            ref={ref}
            className="text-heading outline-none w-full h-12 lg:h-14 placeholder-gray-400 text-sm lg:text-base"
            placeholder={t("placeholder-search")}
            aria-label="Search"
            autoComplete="off"
            {...rest}
          />
        </label>
        <button
          type="button"
          className="outline-none text-2xl md:text-3xl text-gray-400 absolute top-0 ltr:right-0 rtl:left-0 w-12 md:w-14 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
          onClick={onClear}
        >
          <IoCloseOutline className="w-6 h-6" />
        </button>
      </form>
    );
  }
);

SearchBox.displayName = "SearchBox";
export default SearchBox;
