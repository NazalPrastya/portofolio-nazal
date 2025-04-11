export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[50vh]">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute top-2 left-2 w-20 h-20 rounded-full border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent animate-spin-slow"></div>
        <div className="absolute top-4 left-4 w-16 h-16 rounded-full border-4 border-t-transparent border-r-transparent border-b-primary border-l-transparent animate-spin-slower"></div>
      </div>
    </div>
  );
}
