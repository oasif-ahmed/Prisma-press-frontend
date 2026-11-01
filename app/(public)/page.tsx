import { getMe } from "@/service/getMe";

export default async function HomePage() {

  const user = await getMe();

  console.log(user);

  return (
    <>
    <div>Hello this my next level next js learning</div>
    <button className="bg-black text-white px-4 py-2 rounded text-xs font-medium hover:bg-gray-800">Click me</button>
    </>
  );
}
