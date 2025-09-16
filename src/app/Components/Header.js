export default function Header() {
  return (
    <div className=" w-full flex items-center h-[60px] bg-[#000428] justify-around  ">
      <div>
        <h1 className="text-white text-2xl">Quiz Coder</h1>
      </div>

      <div className="w-[200px] flex items-center justify-around ">
        <p className="text-lg cursor-pointer text-white">About </p>
        <p className="text-lg cursor-pointer text-white">Contact </p>
      </div>
    </div>
  );
}
