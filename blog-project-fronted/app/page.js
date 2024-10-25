import Navbar from "@/components/Navbar/Navbar";
import Post from "@/components/Post/Post";


export default function Home() {
  return (
    <div className="">
      <Navbar/>
      <div className="w-1/2 mx-auto  my-20">
        <Post/>
      </div>
    </div>
  );
}
