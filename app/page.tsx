import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div className="">
        <div className="">
            <Image
              src="/lpm-logo.jpg"
              alt="Vercel Logo"
              width={300}
              height={300}
              priority
            />
            Coming Soon.
        </div>
      </div>
    </main>
  );
}
