// src/modules/common/components/carousel/index.tsx
"use client";

import React, { useRef } from "react";
import { Swiper } from "swiper/react";
import { useParams } from "next/navigation"; // Use App Router API
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import { getDirection } from "@lib/util/get-direction";
import CarouselNavigation from "@modules/common/components/carousel-navigation";

type CarouselPropsType = {
  className?: string;
  buttonClassName?: string;
  prevActivateId?: string;
  nextActivateId?: string;
  buttonSize?: "default" | "small";
  paginationVariant?: "default" | "circle";
  centeredSlides?: boolean;
  breakpoints?: {} | any;
  pagination?: {} | any;
  navigation?: {} | any;
  autoplay?: {} | any;
  loop?: boolean;
  scrollbar?: {} | any;
  buttonPosition?: "inside" | "outside";
  showNavigation?: boolean;
  children: React.ReactNode;
};

const Carousel: React.FC<CarouselPropsType> = ({
  children,
  className = "",
  prevActivateId = "",
  nextActivateId = "",
  buttonClassName = "",
  buttonSize = "default",
  paginationVariant = "default",
  breakpoints,
  loop,
  autoplay = false,
  buttonPosition = "outside",
  showNavigation = true,
  ...props
}) => {
  const { locale } = useParams(); // Get locale from URL params (e.g., /en/...)
  const dir = getDirection(locale as string || "en");
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`carouselWrapper relative ${className} ${
        paginationVariant === "circle" ? "dotsCircle" : ""
      }`}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Scrollbar]}
        loop={loop ?? true}
        autoplay={autoplay}
        breakpoints={breakpoints}
        dir={dir}
        navigation={{
          prevEl: prevActivateId.length
            ? `#${prevActivateId}`
            : prevRef.current!,
          nextEl: nextActivateId.length
            ? `#${nextActivateId}`
            : nextRef.current!,
        }}
        {...props}
      >
        {children}
      </Swiper>
      {Boolean(showNavigation) ? (
        <CarouselNavigation
          buttonPosition={buttonPosition}
          buttonSize={buttonSize}
          dir={dir}
          buttonClassName={buttonClassName}
          prevActivateId={prevActivateId}
          nextActivateId={nextActivateId}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Carousel;