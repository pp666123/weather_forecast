interface objectType {
  link: string;
  title: string;
  description: string;
}

export default function Page(wearherData: objectType) {
  return (
    <div className="bg-[#fdfaf7] text-[#785e3a] border-solid border-gray-300 overflow-hidden p-[20px] shadow-inner-2 rounded-lg">
      <div>
        <iframe
          className="w-full"
          height="315"
          src={`https://www.youtube.com/embed/${wearherData.link
            .split("/")
            .pop()}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <div>
          <h3 className="text-3xl py-3 text-center">{wearherData.title}</h3>
          <p className="px-4 text-lg">{wearherData.description}</p>
        </div>
      </div>
    </div>
  );
}
