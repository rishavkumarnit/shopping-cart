

function App() {

  const images = [
    "https://picsum.photos/id/1011/200/200",
    "https://picsum.photos/id/1012/200/200",
    "https://picsum.photos/id/1013/200/200",
    "https://picsum.photos/id/1015/200/200",
    "https://picsum.photos/id/1016/200/200",
    "https://picsum.photos/id/1018/200/200",
  ];
  return (
    <>
      <div className="bg-amber-500">sdasasaas</div>
       <div className="w-full overflow-hidden bg-gray-100 py-6">
      {/* Outer container */}
      <div className="flex animate-marquee">
        {/* Duplicate list for seamless looping */}
        {[...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`logo-${i}`}
            className="w-24 h-24 mx-4 rounded-full object-cover shadow-md"
          />
        ))}
      </div>
    </div>
    </>
  );
}

export default App;
