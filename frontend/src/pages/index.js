import HomeBar from "@/components/HomeBar";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HomeBar />
      <div className="flex p-7 items-center">
        <h1 className="text-9xl font-bold grow-3">CREA. INSPIRA.</h1>
        <p className="grow-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
      </div>

      <div className="bg-[url(/hero.jpg)] flex-grow bg-cover bg-center rounded-t-2xl"></div>

    </div>
  );
}
