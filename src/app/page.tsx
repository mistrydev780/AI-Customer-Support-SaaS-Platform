import HomeClient from "@/component/HomeClient";
import { getSession } from "@/lib/getSession";
export default async function Home() {
  const session = await getSession();
  // console.log("SESSION:", session);
  return (
   <div>
    <HomeClient email={session?.user?.email}/>
   </div>
  );
}
