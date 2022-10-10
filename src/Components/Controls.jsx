import React from "react";

const Controls = (props) => {
  const {
    pageNumber,
    numPages,
    setPageNumber,
    scale,
    setScale,
    handle,
    viewType,
  } = props;

  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;

  const firstPageClass =
    isFirstPage || viewType === "Vertical"
      ? "cursor-not-allowed text-gray-400"
      : "cursor-pointer";
  const lastPageClass =
    isLastPage || viewType === "Vertical"
      ? "cursor-not-allowed text-gray-400"
      : "cursor-pointer";

  const goToPreviousPage = () => {
    if (viewType === "Vertical") return;
    if (!isFirstPage) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (viewType === "Vertical") return;
    if (!isLastPage) setPageNumber(pageNumber + 1);
  };
  const onPageChange = (e) => {
    const { value } = e.target;
    if (Number(value) > numPages) return;
    setPageNumber(Number(value));
  };

  const isMinZoom = scale < 0.6;
  const isMaxZoom = scale >= 2.0;

  const zoomOutClass = isMinZoom
    ? "cursor-not-allowed text-gray-400"
    : "cursor-pointer";
  const zoomInClass = isMaxZoom
    ? "cursor-not-allowed text-gray-400"
    : "cursor-pointer";

  const zoomOut = () => {
    if (!isMinZoom) setScale(scale - 0.1);
  };

  const zoomIn = () => {
    if (!isMaxZoom) setScale(scale + 0.1);
  };

  return (
    <div className="bg-white m-3 px-1 py-3 md:p-3 flex items-center justify-between rounded-md sticky top-0 z-50 drop-shadow-md">
      <div className="">
        <i
          className={`fas fa-backward mx-1 ${firstPageClass}`}
          onClick={goToPreviousPage}
        />
        <span className="mx-1">
          Page{" "}
          <input
            name="pageNumber"
            type="number"
            min={1}
            max={numPages || 1}
            className="p-0 pl-1 md:mx-2"
            value={pageNumber}
            onChange={onPageChange}
            disabled={viewType === "Vertical"}
          />{" "}
          of {numPages}
        </span>
        <i
          className={`fas fa-forward mx-1 ${lastPageClass}`}
          onClick={goToNextPage}
        />
      </div>
      <div>
        <i
          className={`fas fa-search-minus mx-2 ${zoomOutClass}`}
          onClick={zoomOut}
        />
        <span>{(scale * 100).toFixed()}%</span>
        <i
          className={`fas fa-search-plus mx-2 ${zoomInClass}`}
          onClick={zoomIn}
        />
        {handle.active ? (
          <i
            className="mx-2 fa-solid fa-minimize cursor-pointer"
            onClick={handle.exit}
          ></i>
        ) : (
          <i
            className="mx-2 fa-solid fa-expand cursor-pointer"
            onClick={handle.enter}
          ></i>
        )}
      </div>
    </div>
  );
};

export default Controls;
