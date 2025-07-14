"use client";
import Image from "next/image";
import "mapbox-gl/dist/mapbox-gl.css";
import MapGL, { Marker } from "react-map-gl";
import { useState, useRef } from "react";
import { demoPhotos } from "@/utils/photos";
import { Photo } from "@/types/photo";
import { Tag } from "@/components/Tag";

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [fullView, setFullView] = useState(false);
  const mapRef = useRef<any>(null);

  const handleMarkerClick = (photo: Photo, e: any) => {
    e.originalEvent.stopPropagation();
    setSelectedPhoto(photo);
    setFullView(false);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [photo.location.longitude, photo.location.latitude],
        zoom: 15,
        duration: 1000,
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <div className="shadow-lg bg-white text-left rounded p-4 w-screen">
        <h1 className="text-stone-900 font-bold text-2xl">Nostos</h1>
      </div>
      <div className="relative w-full flex-1 flex">
        <div className="flex-1">
          <MapGL
            ref={mapRef}
            initialViewState={{
              latitude: 38.0934,
              longitude: 37.8781,
              zoom: 8,
            }}
            style={{ width: "100%", height: 900 }}
            mapStyle="mapbox://styles/mapbox/light-v11"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          >
            {demoPhotos.map((photo) => (
              <Marker
                key={photo.id}
                longitude={photo.location.longitude}
                latitude={photo.location.latitude}
                onClick={(e) => handleMarkerClick(photo, e)}
              >
                <Image
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  width={80}
                  height={80}
                  className=" border-2 border-white shadow-md cursor-pointer"
                />
              </Marker>
            ))}
          </MapGL>
        </div>
        {/* Side Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
            ${selectedPhoto ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {selectedPhoto && (
            <div className="relative flex flex-col h-full p-12  overflow-y-auto">
              <button
                className="self-end mb-2 text-gray-500 hover:text-gray-800 text-2xl"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                width={500}
                height={300}
                className="rounded mb-4"
              />
              <div className="flex flex-col p-2">
                <p className="text-lg font-bold">{selectedPhoto.title}</p>
                <p className="text-base mb-2">{selectedPhoto.description}</p>
                <p className="text-xs text-gray-500 mb-2">
                  {selectedPhoto.location.address}
                </p>
              </div>
              {selectedPhoto.comments && selectedPhoto.comments.length > 0 && (
                <div className="w-full mt-2">
                  <h3 className="text-sm font-semibold mb-1">
                    Comments{" "}
                    <span className="text-xs font-light">
                      ({selectedPhoto.comments.length})
                    </span>
                  </h3>
                  <ul className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedPhoto.comments.map((comment) => (
                      <li
                        key={comment.id}
                        className="bg-stone-100 rounded p-2 text-xs"
                      >
                        <span className="font-bold">{comment.userName}:</span>{" "}
                        {comment.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                className="absolute top-4 right-4 mt-4 px-4 py-2 bg-stone-900 text-white rounded hover:bg-stone-700"
                onClick={() => setFullView(true)}
              >
                View Full
              </button>
            </div>
          )}
        </div>
        {/* Full Page Overlay */}
        {selectedPhoto && fullView && (
          <div className="fixed inset-0 z-50 bg-white flex flex-row items-stretch">
            {/* Left: Large Photo and Names */}
            <div className="flex flex-col items-center justify-center flex-1 p-8">
              <button
                className="self-end mb-2 text-gray-500 hover:text-gray-800 text-2xl"
                onClick={() => setFullView(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                width={700}
                height={700}
                className="rounded mb-6 max-h-[70vh] object-contain"
              />
              {/* Names/Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPhoto.userTags?.map((tag) => (
                  <Tag key={tag.id} tag={tag} />
                ))}
              </div>
              {/* Year */}
              <div className="w-full flex justify-end">
                <span className="text-3xl font-bold text-slate-700">
                  {selectedPhoto.dateTaken?.year || ""}
                </span>
              </div>
            </div>
            {/* Right: Map and Comments */}
            <div className="flex flex-col w-[500px] p-8 border-l border-slate-200 bg-slate-50">
              {/* Mini Map */}
              <div className="mb-6 rounded shadow overflow-hidden">
                <MapGL
                  initialViewState={{
                    latitude: selectedPhoto.location.latitude,
                    longitude: selectedPhoto.location.longitude,
                    zoom: 16,
                  }}
                  style={{ width: "100%", height: 200 }}
                  mapStyle="mapbox://styles/mapbox/light-v11"
                  mapboxAccessToken={
                    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
                  }
                  interactive={false}
                >
                  <Marker
                    longitude={selectedPhoto.location.longitude}
                    latitude={selectedPhoto.location.latitude}
                  >
                    <div className="w-6 h-6 bg-stone-900 rounded-full border-2 border-white" />
                  </Marker>
                </MapGL>
                <div className="p-2 text-xs font-semibold">
                  {selectedPhoto.location.address}
                </div>
              </div>
              {/* Comments */}
              <div className="flex-1 overflow-y-auto">
                <h3 className="text-base font-semibold mb-2">Comments</h3>
                <ul className="space-y-2">
                  {selectedPhoto.comments.map((comment) => (
                    <li
                      key={comment.id}
                      className="bg-white rounded p-3 text-sm shadow"
                    >
                      <span className="font-bold">{comment.userName}</span>
                      <div>{comment.text}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
